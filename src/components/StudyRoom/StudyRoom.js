import React from 'react';
import "./StudyRoom.scss"

const StudyRoom = ({match}) => {

    //API: [GET] 스터디룸 정보
    // {match.params.studyroomID}

    const studyRoomInfo = {
        studyroomID: 1,
        studyroomTitle: "취준생들 모여서 즐겁게 얘기해요!",
        studyroomDate: "",
        studyroomMinLevel: 1,
        studyroomTime: 1,
        studyroomMaxUser: 1,
        state: "pending"
    }

    //API: [GET] 스터디룸 유저 정보
    const studyRoomUserList = [{
        userID: "asdf@naver.com",
        userNickname: "user1",
        userProfilePath: " ",
        userLevel: 15
    },{
        userID: "asdf@naver.com",
        userNickname: "user2",
        userProfilePath: " ",
        userLevel: 12
    },{
        userID: "tyty12@naver.com",
        userNickname: "user3",
        userProfilePath: " ",
        userLevel: 9
    },{
        userID: "wded@naver.com",
        userNickname: "user1",
        userProfilePath: " ",
        userLevel: 7
    }]


    return (

        <div className="Container StudyRoom">
            <div className="main-box">
                <div className="category">
                    {(() => {
                        switch (match.params.category) {
                            case "travel":
                                return "여행";
                            default:
                                return "자유주제";
                        }
                    })()}
                </div>
                <div className="title">
                    {studyRoomInfo.studyroomTitle}
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
                                <strong>{studyRoomInfo.studyroomMaxUser}</strong> / 4
                            </td>
                            <td className="MinLevel">
                                <strong>{studyRoomInfo.studyroomTime}</strong> m
                            </td>
                            <td className="Time">
                                Lv.<strong>{studyRoomInfo.studyroomMinLevel}</strong>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className="user">

                </div>
            </div>

            <div className="side-box">
            </div>



        </div>
    );

}

export default StudyRoom;