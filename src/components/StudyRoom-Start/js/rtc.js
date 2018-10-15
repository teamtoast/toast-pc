import $ from 'jquery';
window.$ = $;
var RecordRTC = require('recordrtc');
var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
var SockJS = require('sockjs-client');

var socket;
export function onStudyStart() {
    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        window.audioContext = new AudioContext();
    } catch (e) {
        alert('Web Audio API not supported.');
    }

    navigator.mediaDevices.getUserMedia({video: true, audio: true})
        .then(onGetUserMedia)
        .catch(onFailedToGetUserMedia);
};

var localStream;
var id;
var remotes = [];
var connected = false;

function onGetUserMedia(mediaStream) {
    localStream = mediaStream;
    document.querySelector('#localVideo').srcObject = mediaStream;

    socket = new SockJS('http://localhost:8080/study');
    socket.onopen = onOpen;
    socket.onmessage = msg => onMessage(JSON.parse(msg.data));

    startRecording();

    var script = window.audioContext.createScriptProcessor(2048, 1, 1);
    script.onaudioprocess = onAudio;

    var mic = window.audioContext.createMediaStreamSource(mediaStream);
    mic.connect(script);
    script.connect(window.audioContext.destination);
}

export function onFailedToGetUserMedia(e) {
    console.log(e);
}

function onGetRemoteMedia(target, e) {
    console.log('Get remote!')

    let viewId = 0;
    for(let i = 0; i < remotes.length; i++) {
        if(remotes[i].target == target) {
            viewId = remotes[i].view;
            break;
        }
    }

    if(viewId == 0) {
        for(let i = 1; i < 4; i++) {
            let used = false;
            for(let j = 0; j < remotes.length; j++) {
                if(remotes[j].view == i) {
                    used = true;
                    break;
                }
            }

            if(!used) {
                remotes.push({target: target, view: i});
                viewId = i;
                break;
            }
        }
    }

    let remoteView = document.querySelector('#remoteVideo' + viewId);
    if (remoteView.srcObject !== e.streams[0]) {
        remoteView.srcObject = e.streams[0];
    }
}

function onOpen(event) {
    socket.send(JSON.stringify({cmd: 'join', data: 0}));
    connected = true;
}

function onMessage(msg) {
    console.log(msg);
    switch(msg.cmd) {
        case 'info':
            id = msg.data.id;
            break;
        case 'join':
            onUserJoined(msg.data);
            break;
        case 'offer':
            onReceiveOffer(msg.data.from, msg.data.data);
            break;
        case 'answer':
            onReceiveAnswer(msg.data.from, msg.data.data);
            break;
        case 'candidate':
            OnReceiveIceCandidate(msg.data.from, msg.data.data);
            break;
        case 'recommend':
            if(onBotChat != null && msg.data.script.length > 0 && msg.data.recommend.length > 0) {
                onBotChat('"' + msg.data.script + '"에 대한 추천 답변 문장입니다.');
                onBotChat(msg.data.recommend);
            }
            break;
    }
}

function onUserJoined(user) {
    console.log("User " + user.id + " Joined!");
    if(user.id != id) {
        let peerConnection = createPeerConnection(user.id);
        connectionObj[user.id.toString()] = peerConnection;
        peerConnection.onnegotiationneeded = () => sendOffer(peerConnection, user.id);
    }
}

function send(cmd, data) {
    let obj = {cmd: cmd, data: data};
    //console.log(obj);
    socket.send(JSON.stringify(obj));
}

function createPeerConnection(target) {
    let peerConnection = new RTCPeerConnection({
        'iceServers': [
            {
                'urls': ['stun:stun.l.google.com:19302']
            },
            {
                'urls': ['turn:w1.xirsys.com:80?transport=udp'],
                'username': '35f846ee-be26-11e8-a7fe-35e8f7ade332',
                'credential': '35f84770-be26-11e8-b1ea-1c6f81131643'
            }
        ]
    });

    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));
    peerConnection.ontrack = e => onGetRemoteMedia(target, e);
    peerConnection.oniceconnectionstatechange = e => console.log('Ice Changed: ' + e);

    return peerConnection;
}

function onIceCandidate(target, e) {
    if(e.candidate != null)
        send('candidate', {target: target, data: e.candidate});
}

function sendOffer(peerConnection, target) {
    if(isNegotiating) return;
    isNegotiating = true;
    peerConnection.onsignalingstatechange = (e) => {  // Workaround for Chrome: skip nested negotiations
        isNegotiating = (peerConnection.signalingState != "stable");
        console.log("Negotiating: " + isNegotiating);
    }
    peerConnection.createOffer({
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1
    })
    .then(function(sdp) {
        peerConnection.setLocalDescription(sdp).then(function() {
            send('offer', {target: target, data: sdp});
            peerConnection.onicecandidate = e => onIceCandidate(target, e);
        });
    })
    .catch(function(err) {
        console.log(err);
    });
}

var connectionObj = {};
var isNegotiating = false;

function onReceiveOffer(from, data) {
    let key = from.toString();
    if(!connectionObj.hasOwnProperty(key)) {
        connectionObj[key] = createPeerConnection(from);
    }

    let peerConnection = connectionObj[key];
    peerConnection.setRemoteDescription(data).then(function() {
        peerConnection.createAnswer().then(function(sdp) {
            peerConnection.setLocalDescription(sdp).then(function() {
                send('answer', {target: from, data: sdp});
                peerConnection.onicecandidate = e => onIceCandidate(from, e);
            });
        });
    });
}

function onReceiveAnswer(from, data) {
    let key = from.toString();
    let peerConnection = connectionObj[key];
    peerConnection.setRemoteDescription(data);
}

function OnReceiveIceCandidate(from, data) {
    let key = from.toString();
    let peerConnection = connectionObj[key];
    peerConnection.addIceCandidate(data).then(() => console.log("AddIceCandidates")).catch(err => console.log("Ice Error: " + err));
}

var shouldSave = false;

var startTime = 0;
var recentTime = 0;

var recordRTC;
var recordedChunks = [];

function startRecording() {
    recordRTC = RecordRTC(localStream, { recorderType: StereoAudioRecorder, numberOfAudioChannels: 1, type: 'audio/wav', sampleRate: 44100});
    startTime = new Date().getTime();
    recordedChunks = [];
    shouldSave = false;
    recordRTC.startRecording();
}

function onAudio(event) {
    const input = event.inputBuffer.getChannelData(0);
    let i;
    let max = 0;
    for (i = 0; i < input.length; ++i) {
      if(max < input[i])
        max = input[i];
    }


    if(max < 0.5) {
      let currentTime = new Date().getTime();
      if(recordRTC.state == 'recording' && ((!shouldSave && currentTime - startTime >= 3000) || 
        (shouldSave && currentTime - recentTime >= 3000))) {
        recordRTC.stopRecording(onFinishRecord);
      }
    }
    else {
      shouldSave = true;
      recentTime = new Date().getTime();
    }
}

function onFinishRecord(audioURL) {
    console.log("finish")
    if(shouldSave) {
        console.log("save")
      console.log(audioURL);
      var reader = new FileReader();
      reader.readAsDataURL(recordRTC.getBlob()); 
      reader.onloadend = function() {
        //console.log(reader.result)
        if(connected) {
            send('say', reader.result.split(",")[1]);
        }
      }
    }
    startRecording();
}

var onBotChat;

export function setOnBotChat(callback) {
    onBotChat = callback;
}