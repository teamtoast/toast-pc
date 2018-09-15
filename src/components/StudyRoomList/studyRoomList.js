import React, {Component} from 'react';
import {Container} from "mdbreact";
import "./StudyRoomList.scss"


function StudyRooms() {
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
        studyroomTitle: "2018 대기업 준비방입니다",
        studyroomDate: "",
        studyroomMinLevel: 1,
        studyroomTime: 1,
        studyroomMaxUser: 1,
        state: "ongoing"
    }, {
        studyroomID: 3,
        studyroomTitle: "스터디룸 1",
        studyroomDate: "",
        studyroomMinLevel: 1,
        studyroomTime: 1,
        studyroomMaxUser: 1,
        state: "pending"
    }];

    const listItems = studyRooms.map((studyRoom) =>
        <li className="studyRoom">
            <div className="studyRoom-header">
                <p>{studyRoom.state === "pending"? '대기중' : '진행중'}</p>
            </div>

            <div className="studyRoom-content">
                <div className="title"> {studyRoom.studyroomTitle} </div>

                <button>
                    <img src={require('./img/button-in.png')}
                         srcSet={`
                         ${require('./img/button-in.png')} 300w,
                         ${require('./img/button-in@2x.png')} 768w,
                         ${require('./img/button-in@3x.png')} 1280w`}
                         className="Button_In"></img>
                </button>
            </div>

        </li>
    );
    return (
        <ul className="studyRoom-list">{listItems}</ul>
    );
}

const StudyRoomList = ({match}) => {
    return (
        <Container className="StudyRoomList">
            <div className="title">
                {(() => {
                    switch (match.params.category) {
                        case "free":
                            return "자유주제";
                        case "travel":
                            return "여행";
                        // default:
                        //     return "#FFFFFF";
                    }
                })()}
            </div>
            <div className="list-title">스터디룸 리스트</div>
            <br/>
            <StudyRooms/>
        </Container>
    );
};

export default StudyRoomList;