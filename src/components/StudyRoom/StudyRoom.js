import React from 'react';
import "./StudyRoom.scss"

const studyRoomUserList = [{
    userID: "asdf@naver.com",
    userNickname: "user1",
    userProfilePath: " ",
    userLevel: 15,
    status: 'wait'
}, {
    userID: "asdf@naver.com",
    userNickname: "user2",
    userProfilePath: " ",
    userLevel: 12,
    status: 'ready'
}, {
    userID: "tyty12@naver.com",
    userNickname: "user3",
    userProfilePath: " ",
    userLevel: 9,
    status: 'wait'
}];

const UserList = () => {
    //API: [GET] 스터디룸 유저 정보


    let UserList = studyRoomUserList.map((User, i) =>
        <li key={i}>
            <div className="user-card">
                <div className="profile">
                    <div className={"user-status" + (User.status === "ready" ? " ready" : "")}>
                        <p>{User.status === "ready" ? 'ready' : 'wait'}</p>
                    </div>
                    <div className="profile-picture">
                        <img src={require('./img/profile-pic.png')}
                             className="profile-picture-content" alt=""/>
                    </div>
                    <p className="userNickname">{User.userNickname}</p>
                    <p className="userID">{User.userID}</p>
                    <button className="btn-add-friend">친구추가</button>

                </div>
                <div className="social-link">

                </div>
            </div>
        </li>
    );

    for (var i = 0; i < 4 - studyRoomUserList.length; i++){
        UserList.push(
            <li key={i}>
                <div className="user-card user-card-empty">
                    <img src={require('./img/profile-pic.png')}
                         className="profile-picture-content" alt=""/>
                    <p>친구를 기다려요!</p>
                </div>
            </li>
        )

    }
    return (
        <ul className="user-list">{UserList}</ul>
    )
    ;
};


const StudyRoom = ({match}) => {

    //API: [GET] 스터디룸 정보
    // {match.params.studyroomID}

    const studyRoomInfo = {
        studyroomID: 1,
        studyroomTitle: "취준생들 모여서 즐겁게 얘기해요!",
        studyroomDate: "",
        studyroomMinLevel: 1,
        studyroomTime: 1,
        studyroomMaxUser: 4,
        category: '자유주제',
        state: "pending"
    }


    return (

        <div className="Container StudyRoom">
            <div className="main-box">
                <div className="category">
                    {studyRoomInfo.category}
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
                                <strong>{studyRoomUserList.length}</strong> / {studyRoomInfo.studyroomMaxUser}
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

                <div className="user-box">
                    <UserList/>
                </div>

                <div className="chat-box">
                </div>
            </div>

            <div className="side-box">
            </div>


        </div>
    );

};

export default StudyRoom;