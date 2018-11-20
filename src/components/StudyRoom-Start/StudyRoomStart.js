import {Component} from "react";
import React from "react";
import "./StudyRoomStart.scss"
import study from "./js/rtc";
import session from "../../socket/session"


/*const studyRoomUserList = [
    {
        userID: "asdf@naver.com",
        userNickname: "나 ME",
        userProfilePath: " ",
        userLevel: 15,
        speechRate: 1,
        videoPath: "localVideo"
    },
    {
        userID: "asdf@naver.com",
        userNickname: "remote",
        userProfilePath: " ",
        userLevel: 15,
        speechRate: 1,
        videoPath: "remoteVideo1"
    },
    {
        userID: "asdf@naver.com",
        userNickname: "remote",
        userProfilePath: " ",
        userLevel: 15,
        speechRate: 1,
        videoPath: "remoteVideo2"
    },
    {
        userID: "asdf@naver.com",
        userNickname: "remote",
        userProfilePath: " ",
        userLevel: 15,
        speechRate: 1,
        videoPath: "remoteVideo3"
    }
];*/

const UserList = (props) => {

    let UserList = props.users.map((User, i) =>
        <li key={i}>
            <div className="user-card">
                <div className="user-nickname">
                    <p>{User.nickname}</p>
                </div>
                <div className="user-video">
                    {User.id == props.myId ? <video id='localVideo' playsInline autoPlay muted/>
                        : <video id={'video' + User.id} playsInline autoPlay/>}
                </div>
                {/*본인인 경우만 button-list 보이도록*/}
                <div className="button-list">
                    <button>
                        <img src={require('./img/button-picture@3x.png')}
                             className="Button_Picture" alt=""/>
                    </button>
                    <button onClick={() => session.send('leave', null)}>
                        <img src={require('./img/button-out@3x.png')}
                             className="Button_Out" alt=""/>
                    </button>
                </div>

            </div>

        </li>
    );

    for (var i = 0; i < 4 - props.users.length; i++) {
        UserList.push(
            <li key={4 - i}>
                <div className="user-card user-card-empty">
                    <img src={require('../StudyRoom/img/ic-toast-gray@3x.png')}
                         className="profile-picture-content" alt=""/>
                    <p>참여없음</p>
                </div>
            </li>
        )

    }
    return (
        <ul className="user-list">{UserList}</ul>
    );
}


const ChatList = (props) => {
    let ChatList = props.chats.map((Chat, i) =>
        <li key={i}>
            <div className="bot-icon">
                <img src={require('../StudyRoom/img/ic-toast-gray@3x.png')}
                     className="profile-picture-content" alt=""/>
            </div>
            <div className="chat-date">
                {Chat.time}
            </div>
            <br/>
            <div className="chat-content">
                {Chat.content}
            </div>
        </li>
    );
    return (
        <div>
            <ul className="chat-list">{ChatList}</ul>
        </div>
    );
}

function pad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
  }
  

class StudyRoomStart extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            chats: []
        };

        session.setCallback('recommend', data => {
            if(data.script.length > 0 && data.recommend.length > 0) {
                this.onBotChat('"' + data.script + '"에 대한 추천 답변 문장입니다.');
                this.onBotChat(data.recommend);
            }
        });
        study.onStudyStart();
    }

    onBotChat = content => {
        let chats = this.state.chats;
        let now = new Date();
        chats.push({
            time: pad(now.getHours(), 2) + ':' + pad(now.getMinutes(), 2) + ':' + pad(now.getSeconds(), 2),
            content: content
        })
        
        this.setState({
            chats: chats
        })
    }

    render() {
        return (
            <div className="Container StudyRoomStart" id="StudyRoomStart">

                <script src="./js/stomp.min.js"/>
                <script src="./js/rtc.js"/>

                <div className="toastbot">
                    <div className="title">
                        <img src={require('./img/chat-bot-logo@3x.png')}
                             className="ChatBot_Logo" alt=""/>
                    </div>
                    <div className="content-box">
                        <ChatList chats={this.state.chats}/>
                    </div>
                </div>
                <div className="main-box">
                    <div className="main-box-content">
                        <div className="studyroom-info">
                            <div className="category">
                                {this.props.state.category.categoryName}
                            </div>
                            <div className="title">
                                {this.props.info.title}
                            </div>
                            <div className="curr-status">
                                <div className="Rectangle-8 Rectangle-8-active">
                                    <p>진행</p>
                                </div>
                                <div className="Rectangle-8">
                                    <p>대기</p>
                                </div>
                            </div>
                        </div>
                        <div className="speech-rate">
                            <p>스피킹 점유율</p>
                        </div>
                        <UserList users={this.props.state.users} myId={this.props.user.id} />

                    </div>
                </div>
            </div>
        );
    };
};

export default StudyRoomStart;