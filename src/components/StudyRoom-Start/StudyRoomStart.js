import {Component} from "react";
import React from "react";
import "./StudyRoomStart.scss"

const studyRoomUserList = [{
    userID: "asdf@naver.com",
    userNickname: "user1",
    userProfilePath: " ",
    userLevel: 15,
    speechRate: 1,
    videoPath: ""
}, {
    userID: "asdf@naver.com",
    userNickname: "Billy Cullen",
    userProfilePath: " ",
    userLevel: 12,
    speechRate: 1,
    videoPath: ""
}];

const UserList = () => {

    let UserList = studyRoomUserList.map((User, i) =>
        <li key={i}>
            <div className="user-card">
                <div className="user-nickname">
                    <p>{User.userNickname}</p>
                </div>
                {/*본인인 경우만 button-list 보이도록*/}
                <div className="button-list">
                    <button>
                        <img src={require('./img/button-picture@3x.png')}
                             className="Button_Picture" alt=""/>
                    </button>
                    <button>
                        <img src={require('./img/button-out@3x.png')}
                             className="Button_Out" alt=""/>
                    </button>
                </div>

            </div>
        </li>
    );

    for (var i = 0; i < 4 - studyRoomUserList.length; i++) {
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


class StudyRoomStart extends Component {

    render() {
        const studyRoomInfo = {
            studyroomID: 1,
            studyroomTitle: "취준생들 모여서 즐겁게 얘기해요!",
            studyroomDate: "",
            studyroomMinLevel: 1,
            studyroomTime: 1,
            studyroomMaxUser: 4,
            category: '자유주제',
            state: "start"
        };

        return (
            <div className="Container StudyRoomStart">
                <div className="toastbot">
                    <div className="title">
                        <img src={require('./img/chat-bot-logo@3x.png')}
                             className="ChatBot_Logo" alt=""/>
                    </div>
                    <div className="content-box">

                   </div>
                </div>
                <div className="main-box">
                    <div className="main-box-content">
                        <div className="studyroom-info">
                            <div className="category">
                                {studyRoomInfo.category}
                            </div>
                            <div className="title">
                                {studyRoomInfo.studyroomTitle}
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
                        <UserList/>

                    </div>
                </div>
            </div>
        );
    };
};

export default StudyRoomStart;