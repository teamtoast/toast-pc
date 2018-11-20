import session from "../../../socket/session"
var RecordRTC = require('recordrtc');
var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;

var connectionObj = {};
var isNegotiating = false;

var localStream;

function onGetUserMedia(mediaStream) {
    localStream = mediaStream;
    document.querySelector('#localVideo').srcObject = mediaStream;

    startRecording();

    var script = window.audioContext.createScriptProcessor(2048, 1, 1);
    script.onaudioprocess = onAudio;

    var mic = window.audioContext.createMediaStreamSource(mediaStream);
    mic.connect(script);
    script.connect(window.audioContext.destination);
    session.send('stream', null);
}

function onFailedToGetUserMedia(e) {
    console.log(e);
}

function onGetRemoteMedia(target, e) {
    console.log('Get remote!')

    let remoteView = document.querySelector('#video' + target);
    if (remoteView.srcObject !== e.streams[0]) {
        remoteView.srcObject = e.streams[0];
    }
}

function createPeerConnection(target) {
    let peerConnection = new RTCPeerConnection({
        'iceServers': [
            {
                'urls': ['stun:stun.l.google.com:19302']
            },
            {
                'urls': ['turn:tk-turn1.xirsys.com:80?transport=udp'],
                'username': 'aa236ee0-eb1c-11e8-8e45-9be63629c971',
                'credential': 'aa236fb2-eb1c-11e8-a9c0-f0544aed98f6'
            }
        ]
    });

    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));
    peerConnection.ontrack = e => onGetRemoteMedia(target, e);
    peerConnection.oniceconnectionstatechange = e => console.log('Ice Changed: ' + e);

    return peerConnection;
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
            session.send('offer', {target: target, data: sdp});
            peerConnection.onicecandidate = e => onIceCandidate(target, e);
        });
    })
    .catch(function(err) {
        console.log(err);
    });
}

function onIceCandidate(target, e) {
    if(e.candidate != null)
        session.send('candidate', {target: target, data: e.candidate});
}

function onReceiveOffer(from, data) {
    let key = from.toString();
    if(!connectionObj.hasOwnProperty(key)) {
        connectionObj[key] = createPeerConnection(from);
    }

    let peerConnection = connectionObj[key];
    peerConnection.setRemoteDescription(data).then(function() {
        peerConnection.createAnswer().then(function(sdp) {
            peerConnection.setLocalDescription(sdp).then(function() {
                session.send('answer', {target: from, data: sdp});
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

function startRecording() {
    recordRTC = RecordRTC(localStream, { recorderType: StereoAudioRecorder, numberOfAudioChannels: 1, type: 'audio/wav', sampleRate: 44100});
    startTime = new Date().getTime();
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
        session.send('say', reader.result.split(",")[1]);
      }
    }
    startRecording();
}

export default {
    onStudyStart: () => {
        session.setCallback('offer', data => onReceiveOffer(data.from, data.data));
        session.setCallback('answer', data => onReceiveAnswer(data.from, data.data));
        session.setCallback('candidate', data => OnReceiveIceCandidate(data.from, data.data));
        session.setCallback('stream', target => {
            let peerConnection = createPeerConnection(target);
            connectionObj[target.toString()] = peerConnection;
            peerConnection.onnegotiationneeded = () => sendOffer(peerConnection, target);
        });
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            window.audioContext = new AudioContext();
        } catch (e) {
            alert('Web Audio API not supported.');
        }
    
        navigator.mediaDevices.getUserMedia({video: true, audio: true})
            .then(onGetUserMedia)
            .catch(onFailedToGetUserMedia);
    },

    stop: () => {
        if(localStream)
            localStream.stop();

        if(recordRTC)
            recordRTC.stopRecording();
    }
};