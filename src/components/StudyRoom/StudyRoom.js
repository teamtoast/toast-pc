import React, {Component} from 'react';
import "./StudyRoom.scss"
import Api from "../../api";
import StudyRoomStart from "../StudyRoom-Start/StudyRoomStart";
import session from "../../socket/session"

/*const studyRoomUserList = [{
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
}];*/

const UserList = (props) => {
    //API: [GET] 스터디룸 유저 정보
    let myId = props.myId;

    let UserList = props.users.map((User, i) =>
        <li key={i}>
            <div className={"user-card" + (User.id === myId ? " user-card-current" : "")}>
                <div className="profile">
                    <div className={"user-status" + (User.ready ? " ready" : "")}>
                        <p>{User.ready ? 'ready' : 'wait'}</p>
                    </div>
                    <div className="profile-picture">
                        <img src={require('./img/profile-pic.png')}
                             className="profile-picture-content" alt=""/>
                        <div className="level-circle">
                            <p>{User.level}</p>
                        </div>
                    </div>
                    <p className="userNickname">{User.nickname}</p>
                    {/*} <p className="userID">{User.userID}</p> {*/}
                    {(User.userID === myId) ? <div className="currUser-circle">나</div>
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

    for (var i = 0; i < 4 - props.users.length; i++) {
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
        console.log(props);
        this.state = {
            category: {
                categoryId: null,
                categoryName: "",
                parentName: ""
            },
            users: [],
            started: false,
            studyroomState: 'wait',
            studyRoomInfo: {},
            categoryKeyword: []
        };
        session.setCallback('join', this.onJoinUser);
        session.setCallback('ready', this.onReadyUpdate);
        session.setCallback('start', this.onStart);

        const categoryId = this.props.match.params.categoryId;
        const studyroomID = this.props.match.params.studyroomID;
        var that = this;
        Api.getParam('/categories', categoryId).then(function (res) {
            that.setState({
                category: res.data
            });
            console.log(res.data);
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

        this.addUser(this.props.user);
        this.getUsersInfo(this.props.location.state.info.users);
    }

    getUsersInfo = (ids, i = 0) => {
        console.log(ids);
        Api.get('/users/' + ids[i]).then(res => {
            let data = res.data;
            this.addUser(data);

            if(ids.length > i)
                this.getUsersInfo(ids, i + 1);
        });
    }

    addUser = (data) => {
        let conflict = false;
        this.state.users.forEach(user => {
            conflict = conflict || user.id == data.id;
        });

        if(!conflict) {
            data.ready = false;
            let users = this.state.users;
            users.push(data);
            this.setState({users: users});
        }
    }

    onJoinUser = (id) => {
        this.getUsersInfo([id]);
    }

    onReadyUpdate = (data) => {
        let users = this.state.users;
        data.forEach(e => {
            users.forEach(u => {
                if(e.id == u.id) {
                    u.ready = e.ready;
                }
            });
        });

        this.setState(users);
    }

    toggleReady = () => {
        session.send('ready', null);
    }

    start = () => {
        session.send('start', null);
    }

    onStart = () => {
        this.setState({started: true});
    }


    render() {
        return (
            this.state.started ?
                <StudyRoomStart state={this.state} user={this.props.user} info={this.props.location.state.info} />
                :
                <div className="Container StudyRoom">
                    <div className="main-box">
                        <div className="category">
                            {(this.state.category.categoryName === '자유주제' ? this.state.category.categoryName
                                : this.state.category.parentName + " > " + this.state.category.categoryName)}
                        </div>
                        <div className="title">
                            {this.props.location.state.info.title}
                        </div>

                        <div className="detail">
                            <table>
                                <thead>
                                <tr>
                                    <th>참여인원</th>
                                    <th className="Time">진행시간</th>
                                    <th>입장레벨</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="MaxUser">
                                        <strong>{this.state.users.length}</strong> / {this.props.location.state.info.maxUsers}
                                    </td>
                                    <td className="Time">
                                        <strong>{this.props.location.state.info.studyMinutes}</strong> m
                                    </td>
                                    <td className="MinLevel">
                                        Lv.<strong>{this.props.location.state.info.minLevel}</strong>
                                        <img src={require('../StudyRoomList/img/ic-arrow@3x.png')} className="up-arrow"
                                             alt=""/>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="user-box">
                            <UserList myId={this.props.user.id} users={this.state.users}/>
                        </div>

                        <div className="chat-box">
                            <div className="text-area">

                            </div>
                            <div className="input-area">
                                <div className="border-line"/>
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
                                onClick={this.toggleReady}
                                className="Button_Ready">
                                Ready
                            </button>
                        </div>
                        <div className="studyroom-start-btn">
                            {/*<button onClick=""*/}`
                                {/*className="Button_Ready">*/}
                                {/*Start*/}
                            {/*</button>*/}
                            <button className="Button_Ready" onClick={this.start}>Start</button>

                        </div>
                    </div>
                </div>
        );
    };
};

export default StudyRoom;