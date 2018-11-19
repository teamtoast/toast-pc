var SockJS = require('sockjs-client');

var socket;
var onConnected;
var userId;

function connect(authorization, callback = null) {
    socket = new SockJS('http://localhost:8080/study');
    socket.onopen = event => send('connect', authorization);
    socket.onmessage = msg => onMessage(JSON.parse(msg.data));
    onConnected = callback;
}

function send(cmd, data) {
    let obj = {cmd: cmd, data: data};
    socket.send(JSON.stringify(obj));
}

var callbacks = {};

function onMessage(msg) {
    console.log(msg);
    if(msg.cmd == 'connect') {
        userId = msg.data;
        if(onConnected)
            onConnected();
    }
    else if(callbacks[msg.cmd]) {
        callbacks[msg.cmd](msg.data);
    }
}

module.exports = {
    createRoom: function(authorization, info) {
        connect(authorization, () => send('create', info));
    },

    setCallback: (cmd, callback) => {
        callbacks[cmd] = callback;
    },

    printInfo: () => {
        console.log(userId);
    }
};