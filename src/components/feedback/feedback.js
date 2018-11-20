import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './feedback.scss'
import FeedbackContent from "./feedbackContent";

class Feedback extends Component {
    state = {
        feedbackList: [
            {
                studyroomID: 1,
                studyroomTitle: "취준생 같이 토론해요",
                studyroomDate: '18/11/21',
                categoryName: '환경',
            }, {
                studyroomID: 3,
                studyroomTitle: "같이 얘기할까요",
                studyroomDate: '18/11/21',
                categoryName: '사회',
            }, {
                studyroomID: 4,
                studyroomTitle: "영어스피킹 공부",
                studyroomDate: '18/11/21',
                categoryName: '연애',
            },
        ],
        currentFeedback: {
            studyroomID: 1,
            studyroomTitle: "취준생 같이 토론해요",
            studyroomDate: '18/11/21',
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
                    <FeedbackContent feedback={this.state.currentFeedback}/>
                </div>

            </div>
        );
    }
}

export default Feedback;
