import React, {Component} from 'react';
import "./home.scss"
import {StudyRooms} from "../StudyRoomList/studyRoomList";
import "../StudyRoomList/StudyRoomList.scss"
import {CategoryList} from "../studyCategory/studyCategory";

function UserRank(props) {
    let userList = props.userRankList;
    let userRankList = userList.map((user, i) =>
        <li key={i} className="box-sm-user">
            <p className="user-index">{i+1}</p>
            <img src={require('./img/ic-home-character@3x.png')}
                 className="user-profile-image" alt=""/>
            <p className="user-nickname">
                {user.userNickname}
            </p>
            <p className="user-level">
                Lv.{user.userLevel}
            </p>
        </li>
    );

    return <ul>{userRankList}</ul>
}

class Home extends Component {
    render() {
        const toadyEnglish = {
            koreanSentence: "몇시에 돌아와요?",
            englishSentence: "When do we come back?",
            pronunciation: "웬 두 위 컴 백?"
        }

        const todayStudyroom = [
            {
                studyroomID: 1,
                studyroomTitle: "취준생 모임",
                studyroomDate: null,
                categoryID: 1,
                studyroomMinLevel: 1,
                studyroomTime: 30,
                studyroomMaxUser: 3,
                studyroomState: "pending"
            },
            {
                studyroomID: 2,
                studyroomTitle: "함께 공부해요!",
                studyroomDate: null,
                studyroomMinLevel: 3,
                categoryID: 1,
                studyroomTime: 45,
                studyroomMaxUser: 4,
                studyroomState: "pending"
            },
            {
                studyroomID: 3,
                studyroomTitle: "토익스피킹 시험대비",
                studyroomDate: null,
                studyroomMinLevel: 10,
                categoryID: 1,
                studyroomTime: 30,
                studyroomMaxUser: 2,
                studyroomState: "start"
            }
        ]

        const userRankList = [
            {
                profileImage: "",
                userNickname: "Anna",
                userLevel: 1
            },
            {
                profileImage: "",
                userNickname: "Anna",
                userLevel: 1
            },
            {
                profileImage: "",
                userNickname: "Anna",
                userLevel: 1
            },
        ]

        const todayCategories = [
            {
                "categoryID": 1,
                "categoryParent": 1,
                categoryName: "자유주제",
                parentName: '자유주제'
            },
            {
                "categoryID": 6,
                "categoryParent": 2,
                "categoryName": "여행",
                parentName: '문화',
                categoryImage: "toast-ser.run.goorm.io/image/3.png"

            },
            {
                "categoryID": 7,
                "categoryParent": 5,
                "categoryName": "연애",
                parentName: '생활',
                categoryImage: "toast-ser.run.goorm.io/image/4.png"

            }
    ]


        return (
            <div className="Container home">
                <div className="today-eng">
                    <p className="title">오늘의 문장</p>
                    <div className="box">
                        <div className="korean-sentence">
                            <p>{toadyEnglish.koreanSentence}</p>
                        </div>
                        <div className="Line"></div>
                        <div className="english-sentence">
                            <p className="main">{toadyEnglish.englishSentence}</p>
                            <p className="sub">{toadyEnglish.pronunciation}</p>
                        </div>
                        <img src={require('./img/ic-home-character@3x.png')}
                             className="ic_Home_Character" alt=""/>
                    </div>
                </div>
                <div className="left-section">
                    <div className="today-studyroom">
                        <p className="title">실시간 참여가능 스터디룸</p>
                        {/*<StudyRooms studyRooms={todayStudyroom}/>*/}

                        <div className="btn-random">
                            <button>
                                <img src={require('./img/button-random-in@3x.png')}
                                     className="Button_Random_In" alt=""/>
                            </button>
                        </div>
                    </div>
                    <div className="today-category">
                        <p className="title">오늘의 인기 카테고리</p>
                        <CategoryList categories={todayCategories}/>
                    </div>
                </div>
                <div className="right-section">
                    <div className="user-rank">
                        <p className="title">유저 랭킹</p>
                        <div className="box">
                            <UserRank userRankList={userRankList}/>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}

export default Home;