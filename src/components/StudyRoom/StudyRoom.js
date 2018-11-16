import React, {Component} from 'react';
import "./StudyRoom.scss"
import Api from "../../api";
import StudyRoomStart from "../StudyRoom-Start/StudyRoomStart";

const studyRoomUserList = [{
    userID: "taylor@naver.com",
    userNickname: "Taylor",
    userProfilePath: " ",
    userLevel: 15,
    userState: "ready"
}, {
    userID: "Ben55@naver.com",
    userNickname: "Ben",
    userProfilePath: " ",
    userLevel: 12,
    userState: "ready"
}];

const UserList = (props) => {
    //API: [GET] 스터디룸 유저 정보
    let CurrUser = props.currUser;

    let UserList = studyRoomUserList.map((User, i) =>
        <li key={i}>
            <div className={"user-card" + (User.userID === CurrUser.userID ? " user-card-current" : "")}>
                <div className="profile">
                    <div className={"user-status" + (User.userState === "ready" ? " ready" : "")}>
                        <p>{User.userState === "ready" ? 'ready' : 'wait'}</p>
                    </div>
                    <div className="profile-picture">
                        <img src={require('./img/profile-pic.png')}
                             className="profile-picture-content" alt=""/>
                        <div className="level-circle">
                            <p>{User.userLevel}</p>
                        </div>
                    </div>
                    <p className="userNickname">{User.userNickname}</p>
                    <p className="userID">{User.userID}</p>
                    {(User.userID === CurrUser.userID) ? <div className="currUser-circle">나</div>
                        : (User.userState === "ready" ?
                            <button className="btn-add-friend">친구추가</button> :
                            <button className="btn-add-friend btn-add-friend-grey">친구추가</button>)
                    }


                </div>

                <div className="social-link">
                    <ul>
                        <li>
                            <a href="">
                                <img src={require('./img/ic-social-facebook@3x.png')}
                                     className="ic-social" alt=""/>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src={require('./img/ic-social-twitter@3x.png')}
                                     className="ic-social" alt=""/>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src={require('./img/ic-social-web@3x.png')}
                                     className="ic-social" alt=""/>
                            </a>
                        </li>
                    </ul>
                </div>

            </div>
        </li>
    );

    for (var i = 0; i < 4 - studyRoomUserList.length; i++) {
        UserList.push(
            <li key={4 - i}>
                <div className="user-card user-card-empty">
                    <img src={require('./img/ic-toast-gray@3x.png')}
                         className="profile-picture-content" alt=""/>
                    <p>친구를 기다려요!</p>
                </div>
            </li>
        )

    }


    return (
        <ul className="user-list">{UserList}</ul>
    );
};

function CategoryKeyword(props) {
    let keywords = props.keywords;

    let listItems = keywords.map((keyword, i) =>
        <li key={i} className="keyword">
            <p className="keyword-word">{keyword.keyword}</p>
            <p className="keyword-mean">{keyword.mean}</p>
        </li>
    )
    return (
        <ul className="keyword-list">{listItems}</ul>
    );

}

class StudyRoom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            category: {
                categoryName: "",
                parentName: ""
            },
            CurrUser: {
                userID: "taylor@naver.com",
                userNickname: "Taylor",
                userProfilePath: " ",
                userLevel: 15,
                userState: "ready"
            },
            studyroomState: 'wait',
            studyRoomInfo: {},
            categoryKeyword: []
        };

        const categoryId = this.props.match.params.categoryId;
        const studyroomID = this.props.match.params.studyroomID;
        var that = this;
        Api.getParam('/category', categoryId).then(function (res) {
            that.setState({
                category: res.data
            });
        });

        Api.getParam('/studyroom', studyroomID).then(function (res) {
            that.setState({
                studyRoomInfo: res.data
            });
        });

        Api.getParam('/keyword', categoryId).then(function (res) {
            let keywords = [];
            res.data.forEach(element => {
                keywords.push(element);
            });
            that.setState({
                categoryKeyword: keywords
            })
        });
    }


    render() {
        return (
            this.state.studyRoomInfo.studyroomState === 'start' ?
                <StudyRoomStart state={this.state}/>
                :
                <div className="Container StudyRoom">
                    <div className="main-box">
                        <div className="category">
                            {(this.state.category.categoryName === '자유주제' ? this.state.category.categoryName
                                : this.state.category.parentName + " > " + this.state.category.categoryName)}
                        </div>
                        <div className="title">
                            {this.state.studyRoomInfo.studyroomTitle}
                        </div>

                        <div className="detail">
                            <table>
                                <thead>
                                <tr>
                                    <th>참여인원</th>
                                    <th className="MinLevel">진행시간</th>
                                    <th>입장레벨</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="MaxUser">
                                        <strong>{studyRoomUserList.length}</strong> / {this.state.studyRoomInfo.studyroomMaxUser}
                                    </td>
                                    <td className="MinLevel">
                                        <strong>{this.state.studyRoomInfo.studyroomTime}</strong> m
                                    </td>
                                    <td className="Time">
                                        Lv.<strong>{this.state.studyRoomInfo.studyroomMinLevel}</strong>
                                        <img src={require('../StudyRoomList/img/ic-arrow@3x.png')} className="up-arrow"
                                             alt=""/>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="user-box">
                            <UserList currUser={this.state.CurrUser}/>
                        </div>

                        <div className="chat-box">
                            <div className="text-area">

                            </div>
                            <div className="input-area">
                                <div className="border-line"></div>
                                <input className="chat-input"
                                       placeholder="메세지를 입력하세요"
                                       type="text"
                                />
                                <button>
                                    <img src={require('./img/button-send@3x.png')}
                                         className="Button_Send" alt=""/>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="side-box">
                        <div className="studyroom-state">
                            <div className="Rectangle-8">
                                <p>진행</p>
                            </div>
                            <div className="Rectangle-8 Rectangle-8-active">
                                <p>대기</p>
                            </div>
                        </div>
                        <div className="relative-word">
                            <p className="title">{this.state.category.categoryName} 추천 단어 </p>
                            <CategoryKeyword keywords={this.state.categoryKeyword}/>
                        </div>
                        <div className="studyroom-state-btn">
                            <button
                                onClick={() => {
                                    if (this.state.studyroomState === "wait") this.setState({studyroomState: 'ready'});
                                    else if (this.state.studyroomState === "ready") this.setState({studyroomState: 'wait'});

                                }}
                                className={this.state.studyroomState === "wait" ? "Button_Ready" : "Button_Ready Button_Ready-active"}>
                                Ready
                            </button>
                        </div>
                        <div className="studyroom-start-btn">
                            {/*<button onClick=""*/}`
                                {/*className="Button_Ready">*/}
                                {/*Start*/}
                            {/*</button>*/}
                            <button className="Button_Ready">
                                <a href="https://toast-pc.run.goorm.io/study/6/5">Start</a>
                            </button>

                        </div>
                    </div>
                </div>
        );
    };
};

export default StudyRoom;