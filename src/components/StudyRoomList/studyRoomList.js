import React, {Component} from 'react';
import "./StudyRoomList.scss"
import {NavLink} from "react-router-dom";
import StudyCategory from "../studyCategory/studyCategory";


function StudyRooms(props) {
    const studyRooms = [{
        studyroomID: 1,
        studyroomTitle: "취준생들 모여서 즐겁게 얘기해요!",
        studyroomDate: "",
        studyroomMinLevel: 1,
        studyroomTime: 1,
        studyroomMaxUser: 1,
        state: "pending"
    }, {
        studyroomID: 2,
        studyroomTitle: "2018 대기업 준비방입니다 모두모두 어서 들어오세요",
        studyroomDate: "",
        studyroomMinLevel: 1,
        studyroomTime: 1,
        studyroomMaxUser: 3,
        state: "ongoing"
    }, {
        studyroomID: 3,
        studyroomTitle: "스터디룸 1",
        studyroomDate: "",
        studyroomMinLevel: 1,
        studyroomTime: 1,
        studyroomMaxUser: 2,
        state: "pending"
    }, {
        studyroomID: 4,
        studyroomTitle: "취준생들 모여서 즐겁게 얘기해요!",
        studyroomDate: "",
        studyroomMinLevel: 1,
        studyroomTime: 1,
        studyroomMaxUser: 4,
        state: "pending"
    }, {
        studyroomID: 5,
        studyroomTitle: "2018 대기업 준비방입니다",
        studyroomDate: "",
        studyroomMinLevel: 1,
        studyroomTime: 1,
        studyroomMaxUser: 1,
        state: "ongoing"
    }, {
        studyroomID: 6,
        studyroomTitle: "스터디룸 1",
        studyroomDate: "",
        studyroomMinLevel: 1,
        studyroomTime: 1,
        studyroomMaxUser: 2,
        state: "pending"
    }];

    let listItems = studyRooms.map((studyRoom, i) =>


        <li key={i} className="studyRoom">
            <div className={"studyRoom-header" + (studyRoom.state === "ongoing" ? " ongoing" : "")}>
                <p>{studyRoom.state === "pending" ? '대기중' : '진행중'}</p>
            </div>

            <div className="studyRoom-content">
                <div className="title"> {studyRoom.studyroomTitle} </div>
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
                                <strong>{studyRoom.studyroomMaxUser}</strong> / 4
                            </td>
                            <td className="MinLevel">
                                <strong>{studyRoom.studyroomTime}</strong> m
                            </td>
                            <td className="Time">
                                Lv.<strong>{studyRoom.studyroomMinLevel}</strong>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <NavLink exact to={{pathname: '/study/' + props.category + "/" + studyRoom.studyroomID}}>
                    <button>
                        <img src={require('./img/button-in@3x.png')}
                             className="Button_In" alt=""/>
                    </button>
                </NavLink>

            </div>

        </li>
    );
    return (
        <ul className="studyRoom-list">{listItems}</ul>
    );
}

function CreateStudyRoom() {

}

const CreateModal = ({handleClose, modalShow,children}) => {

    const studyRoomInfo = {
        studyroomTitle: "",
        studyroomDate: "",
        studyroomMinLevel: 1,
        studyroomTime: 15 | 30 | 45,
        studyroomMaxUser: 2 | 3 | 4,
    }

    return (
        <div className={modalShow ? "modal display-block" : "modal display-none"}>
            <section className="modal-main">

                {children}

                <button className="submit-button" onClick={handleClose}>완료</button>
            </section>
        </div>
    );
}

class StudyRoomList extends Component {
    state = {
        studyRoomInfo: {
            studyroomTitle: "",
            studyroomDate: "",
            studyroomMinLevel: 1,
            studyroomTime: 15 | 30 | 45,
            studyroomMaxUser: 2 | 3 | 4,
        },
        modalShow: false
    };

    showModal = () => {
        this.setState({modalShow: true});
    };

    hideModal = () => {
        this.setState({modalShow: false});
    };

    render() {
        const category = this.props.match.params.category;

        return (
            <div className="Container StudyRoomList">

                <CreateModal modalShow={this.state.modalShow} handleClose={this.hideModal}>
                    <p className="title">스터디룸 개설</p>

                    <div className="input-group">
                        <div className="type">방 제목</div>
                        <input className="Rectangle-19"
                               placeholder="방 제목 입력"
                               type="text"
                               onChange={(e) => {
                                   let studyRoomInfo = {...this.state.studyRoomInfo};
                                   studyRoomInfo.studyroomTitle = e.target.value;
                                   this.setState({studyRoomInfo});
                               }}/>
                    </div>
                    <div className="input-group">
                        <div className="type">입장제한 레벨</div>
                        <input className="Rectangle-19 Rectangle-19-sm"
                               placeholder="Lv.(예시: 3)"
                               type="text"
                               onChange={(e) => {
                                   let studyRoomInfo = {...this.state.studyRoomInfo};
                                   studyRoomInfo.studyroomMinLevel = e.target.value;
                                   this.setState({studyRoomInfo});
                               }}/> <p className="desc">이상 입장 가능</p>
                    </div>
                    <div className="input-group">
                        <div className="type">스터디 진행 시간</div>
                        <div className="Time">
                            <button
                                onClick={() => {
                                    this.setState({studyroomTime: 15});
                                    console.log(this.state.studyroomTime);
                                }}
                                className={this.state.studyroomTime === 15 ? "Button_Time_1 active" : "Button_Time_1"}>
                                15m
                            </button>
                            <button
                                onClick={() => {
                                    this.setState({studyroomTime: 30});
                                    console.log(this.state.studyroomTime);
                                }}
                                className={this.state.studyroomTime === 30 ? "Button_Time_2 active" : "Button_Time_2"}>
                                30m
                            </button>
                            <button
                                onClick={() => {
                                    this.setState({studyroomTime: 45});
                                    console.log(this.state.studyroomTime);
                                }}
                                className={this.state.studyroomTime === 45 ? "Button_Time_3 active" : "Button_Time_3"}>
                                45m
                            </button>

                        </div>
                    </div>
                    <div className="input-group">
                        <div className="type">최대 인원</div>
                        <div className="MaxUser">
                            <button
                                onClick={() => {
                                    this.setState({studyroomMaxUser: 15});
                                    console.log(this.state.studyroomMaxUser);
                                }}
                                className={this.state.studyroomMaxUser === 15 ? "Button_MaxUser_1 active" : "Button_MaxUser_1"}>
                                2명
                            </button>
                            <button
                                onClick={() => {
                                    this.setState({studyroomMaxUser: 30});
                                    console.log(this.state.studyroomMaxUser);
                                }}
                                className={this.state.studyroomMaxUser === 30 ? "Button_MaxUser_2 active" : "Button_MaxUser_2"}>
                                3명
                            </button>
                            <button
                                onClick={() => {
                                    this.setState({studyroomMaxUser: 45});
                                    console.log(this.state.studyroomMaxUser);
                                }}
                                className={this.state.studyroomMaxUser === 45 ? "Button_MaxUser_3 active" : "Button_MaxUser_3"}>
                                4명
                            </button>
                        </div>
                    </div>


                </CreateModal>

                <div className="title">
                    {(() => {
                        switch (category) {
                            case "travel":
                                return "여행";
                            default:
                                return "자유주제";
                        }
                    })()}
                </div>
                <div className="list-title">스터디룸 리스트</div>
                <br/>
                <StudyRooms category={category}/>

                <button onClick={this.showModal}>
                    <img src={require('./img/button-fab-plus@3x.png')}
                         className="Button_FAB_Plus" alt=""/>
                </button>

            </div>);
    }

}


export default StudyRoomList;