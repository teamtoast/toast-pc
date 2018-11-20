import React, {Component} from 'react';
import "./StudyRoomList.scss"
import {NavLink} from "react-router-dom";
import Api from "../../api";
import session from "../../socket/session"
import Cookies from "js-cookie"


export function StudyRooms(props) {

    let listItems = props.studyrooms.map((studyRoom, i) =>
        <li key={i} className="studyRoom">
            <div className={"studyRoom-header" + (studyRoom.state === "start" ? " start" : "")}>
                <p>{studyRoom.state === "pending" ? '대기중' : '진행중'}</p>
            </div>

            <div className="studyRoom-content">
                <div className="title"> {studyRoom.title} </div>
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
                                <strong>{studyRoom.users.length}</strong> / {studyRoom.maxUsers}
                            </td>
                            <td className="Time">
                                <strong>{studyRoom.studyMinutes}</strong> m
                            </td>
                            <td className="MinLevel">
                                Lv.<strong>{studyRoom.minLevel}</strong>
                                <img src={require('./img/ic-arrow@3x.png')} className="up-arrow" alt=""/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <button onClick={() => props.onJoinClick(studyRoom.id)}>
                    <img src={require('./img/button-in@3x.png')} className="Button_In" alt=""/>
                </button>
                {/*(studyRoom.studyroomState === "pending" ?
                        <NavLink exact to={{pathname: '/study/' + studyRoom.categoryID + "/" + studyRoom.studyroomID}}>
                            <button>
                                <img src={require('./img/button-in@3x.png')} className="Button_In" alt=""/>
                            </button>
                        </NavLink>
                        :
                    <NavLink exact to={{pathname: '/study/' + studyRoom.categoryId + "/" + studyRoom.studyroomID}}>
                        <button>
                            <img src={require('./img/button-ban@3x.png')} className="Button_In Button_In_Ban"
                                 alt=""/>
                        </button>
                    </NavLink>

                )*/}
            </div>

        </li>
    );


    return (
        <ul className="studyRoom-list">{listItems}</ul>
    );
}


const CreateModal = ({modalSubmit, modalShow, children}) => {

    return (
        <div className={modalShow ? "modal display-block" : "modal display-none"}>
            <section className="modal-main">

                {children}

                <button className="submit-button" onClick={modalSubmit}>완료</button>
            </section>
        </div>
    );
}

class StudyRoomList extends Component {

    categoryID;

    constructor(props) {
        super(props);
        this.state = {
            studyrooms: [],
            category: {
                categoryName: "",
                parentName: ""
            },
            info: {category: this.props.match.params.categoryID},
            modalShow: false
        };
        this.categoryID = this.props.match.params.categoryID;

        var that = this;
        //API: [GET] 스터디룸 리스트 가져오기
        Api.get('/studyrooms/' + this.categoryID).then(function (res) {
            that.setState({
                studyrooms: res.data
            })
        });


        Api.getParam('/categories', this.categoryID).then(function (res) {
            that.setState({
                category: res.data
            });
        });

    }


    showModal = () => {
        this.setState({modalShow: true});
    };

    hideModal = () => {
        this.setState({modalShow: false});
    };

    modalSubmit = () => {
        // API: [POST] 모달 생성
        let authorization = Cookies.get('authorization');
        session.setCallback('info', this.onJoin);
        session.createRoom(authorization, this.state.info);
        /*Api.post('/studyroom',
            {
                categoryId: parseInt(this.props.match.params.categoryId),
                studyroomTitle: this.state.studyRoomInfo.studyroomTitle,
                studyroomMinLevel: this.state.studyRoomInfo.studyroomMinLevel,
                studyroomTime: this.state.studyRoomInfo.studyroomTime,
                studyroomMaxUser: this.state.studyRoomInfo.studyroomMaxUser
            }).then(function (res) {
            console.log(res);
        });*/
        //window.location.reload();
    }

    joinRoom = (id) => {
        let authorization = Cookies.get('authorization');
        session.setCallback('info', this.onJoin);
        session.joinRoom(authorization, id);
    }

    onJoin = (info) => {
        session.shouldAlive = true;
        this.props.history.push({pathname: '/study/' + this.categoryID + '/' + info.id, state: {info: info}});
    }


    render() {
        return (
            <div className="Container StudyRoomList">

                <CreateModal modalShow={this.state.modalShow} modalSubmit={this.modalSubmit}>
                    <p className="title">스터디룸 개설</p>
                    <button onClick={this.hideModal}>
                        <img src={require('./img/close-button.png')}
                             className="Close_Button" alt=""/>
                    </button>

                    <div className="input-group">
                        <div className="type">방 제목</div>
                        <input className="Rectangle-19"
                               placeholder="방 제목 입력"
                               type="text"
                               onChange={(e) => {
                                   let info = this.state.info;
                                   info.title = e.target.value;
                                   this.setState({info: info});
                               }}/>
                    </div>
                    <div className="input-group">
                        <div className="type">입장제한 레벨</div>
                        <input className="Rectangle-19 Rectangle-19-sm"
                               placeholder="Lv.(예시: 3)"
                               type="text"
                               onChange={(e) => {
                                    let info = this.state.info;
                                    info.minLevel = e.target.value;
                                    this.setState({info: info});
                               }}/> <p className="desc">이상 입장 가능</p>
                    </div>
                    <div className="input-group">
                        <div className="type">스터디 진행 시간</div>
                        <div className="Time">
                            <button
                                onClick={() => {
                                    let info = this.state.info;
                                    info.studyMinutes = 15;
                                    this.setState({info: info});
                                }}
                                className={this.state.info.studyMinutes === 15 ? "Button_Time_1 active" : "Button_Time_1"}>
                                15m
                            </button>
                            <button
                                onClick={() => {
                                    let info = this.state.info;
                                    info.studyMinutes = 30;
                                    this.setState({info: info});
                                }}
                                className={this.state.info.studyMinutes === 30 ? "Button_Time_2 active" : "Button_Time_2"}>
                                30m
                            </button>
                            <button
                                onClick={() => {
                                    let info = this.state.info;
                                    info.studyMinutes = 45;
                                    this.setState({info: info});
                                }}
                                className={this.state.info.studyMinutes === 45 ? "Button_Time_3 active" : "Button_Time_3"}>
                                45m
                            </button>

                        </div>
                    </div>
                    <div className="input-group">
                        <div className="type">최대 인원</div>
                        <div className="MaxUser">
                            <button
                                onClick={() => {
                                    let info = this.state.info;
                                    info.maxUsers = 2;
                                    this.setState({info: info});
                                }}
                                className={this.state.info.maxUsers === 2 ? "Button_MaxUser_1 active" : "Button_MaxUser_1"}>
                                2명
                            </button>
                            <button
                                onClick={() => {
                                    let info = this.state.info;
                                    info.maxUsers = 3;
                                    this.setState({info: info});
                                }}
                                className={this.state.info.maxUsers === 3 ? "Button_MaxUser_2 active" : "Button_MaxUser_2"}>
                                3명
                            </button>
                            <button
                                onClick={() => {
                                    let info = this.state.info;
                                    info.maxUsers = 4;
                                    this.setState({info: info});
                                }}
                                className={this.state.info.maxUsers === 4 ? "Button_MaxUser_3 active" : "Button_MaxUser_3"}>
                                4명
                            </button>
                        </div>
                    </div>


                </CreateModal>

                <div className="title">
                    {(this.state.category.categoryName === '자유주제' ? this.state.category.categoryName
                        : this.state.category.parentName + " > " + this.state.category.categoryName)}
                </div>
                <div className="list-title">스터디룸 리스트</div>
                <br/>
                <StudyRooms studyrooms={this.state.studyrooms} onJoinClick={this.joinRoom} />

                <button class="Button_FAB" onClick={this.showModal}>
                    <img src={require('./img/button-fab-plus@3x.png')}
                         className="Button_FAB_Plus" alt=""/>
                </button>

            </div>);
    }

}


export default StudyRoomList;