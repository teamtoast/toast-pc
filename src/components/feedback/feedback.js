import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './feedback.scss'

class Feedback extends Component {
    state = {
        feedbackList: [
            {
                studyroomID: 1,
                studyroomTitle: "취준생 같이 토론해요",
                studyroomDate: '18/10/01',
                categoryName: '환경',
            }, {
                studyroomID: 3,
                studyroomTitle: "같이 얘기할까요",
                studyroomDate: '18/10/02',
                categoryName: '사회',
            }, {
                studyroomID: 4,
                studyroomTitle: "영어스피킹 공부",
                studyroomDate: '18/10/03',
                categoryName: '연애',
            },
        ],
        currentFeedback: {
            studyroomID: 1,
            studyroomTitle: "취준생 같이 토론해요",
            studyroomDate: '18/10/01',
            categoryName: '환경',
        },
    };

    feedbackList = this.state.feedbackList.map((feedback, i) =>
        <li key={i}
            className={"list-box"}>
            <a onClick={() => {this.setState({currentFeedback: feedback});}}>
                {feedback.studyroomDate}
            </a>
        </li>
    );


    render() {
        return (
            <div className="Feedback">
                <div className="study-history">
                    <div className="title">스터디 History</div>
                    <div className="study-date">
                        <ul>{this.feedbackList}</ul>
                    </div>
                </div>
                <div className="study-feedback">
                    <div className="top-box">
                        <div className="feedback-date">
                            {this.state.currentFeedback.studyroomDate}
                        </div>
                        <div className="feedback-title">
                            {this.state.currentFeedback.studyroomTitle}
                        </div>
                        <img src={require('../home/img/ic-home-character@3x.png')}
                             className="ic_Home_Character" alt=""/>
                    </div>

                    <div className="feedback-content">
                        <div className="box box-1">
                            <p className="box-title">
                                내가 했던 표현들
                            </p>
                            <div className="box-content">
                                That would be Venice city where Italy.
                                I love riding the gondola along the canals while watch Italian person live their daily
                                lives.
                            </div>
                        </div>
                        <div className="box box-2">
                            <p className="box-title">
                                토스트가 추천하는 표현
                            </p>
                            <div className="box-content">hi</div>

                            <p className="box-title">
                                내가 실수했던 발음들 Check!
                            </p>
                            <div className="box-content">hi</div>

                        </div>
                        <div className="box box-3">
                            <p className="box-title">
                                나의 점수
                            </p>
                            <div className="box-content">
                                <div className="score">
                                    <p>발음</p>
                                    <div className="score-box">
                                        Excellent
                                    </div>
                                </div>
                                <div className="score">
                                    <p>문법</p>
                                    <div className="score-box">
                                        Great
                                    </div>
                                </div>
                                <div className="score">
                                    <p>단어</p>
                                    <div className="score-box">
                                        Good
                                    </div>
                                </div>
                                <div className="score">
                                    <p>표현</p>
                                    <div className="score-box">
                                        Bad
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Feedback;
