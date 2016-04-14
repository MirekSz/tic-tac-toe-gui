import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

function connect() {
    var socket = new SockJS('http://localhost:8080/chat');
    var stompClient = Stomp.over(socket);
    stompClient.connect('', '', function (frame) {
//        whoami = frame.headers['user-name'];
        console.log('Connected: ' + frame);
        stompClient.subscribe('/user/mirek/queue/messages', function (message) {
            console.log('message: ');
            console.log(message);
        });
//        stompClient.subscribe('/topic/active', function (activeMembers) {
//            console.log('activeMembers: ');
//            console.log(activeMembers);
//        });
    }, stompFailureCallback);
}
var stompFailureCallback = function (error) {
    console.log('STOMP: ' + error);
    setTimeout(stompConnect, 10000);
    console.log('STOMP: Reconecting in 10 seconds');
};

function stompConnect() {
    var socket = new SockJS('http://localhost:8080/chat');
    var stompClient = Stomp.over(socket);
    stompClient.connect('', '', function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/user/mirek/queue/messages', function (message) {
            console.log('message: ');
            console.log(message);
        });
    }, stompFailureCallback);
}

connect();
