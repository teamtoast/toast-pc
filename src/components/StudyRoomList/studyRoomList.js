import React from 'react';
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

const StudyRoomList = ({match}) => {
    const category = match.params.category;

    return (
        <div className="Container StudyRoomList">
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
            <StudyRooms category = {category}/>

            <button>
                <img src={require('./img/button-fab-plus@3x.png')}
                     className="Button_FAB_Plus" alt=""/>
            </button>

        </div>

    );
};

export default StudyRoomList;