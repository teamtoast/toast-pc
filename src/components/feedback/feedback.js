import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import './feedback.scss'
import FeedbackContent from "./feedbackContent";
import api from "../../api";

class Feedback extends Component {

    constructor(props) {
        super(props);

        this.state = {
            feedbackList: []
            // [
            //     {
            //         studyroomID: 1,
            //         studyroomTitle: "취준생 같이 토론해요",
            //         studyroomDate: '18/11/21',
            //         categoryName: '환경',
            //     }, {
            //         studyroomID: 3,
            //         studyroomTitle: "같이 얘기할까요",
            //         studyroomDate: '18/11/21',
            //         categoryName: '사회',
            //     }, {
            //         studyroomID: 4,
            //         studyroomTitle: "영어스피킹 공부",
            //         studyroomDate: '18/11/21',
            //         categoryName: '연애',
            //     },
            // ]
            ,
            currentFeedback: {id: 0},
        };

        var that = this;
        if(this.props.user) {
            api.getParam('/studyrooms/feedbacks', this.props.user.id)
                .then(function (res) {
                        that.setState({
                            feedbackList: res.data
                        });
                    }
                )
            ;
        } else {
            that.setState({feedbackList: []});
        }

    }

    render() {
        console.log(this.props.user);
        let feedbackList = this.state.feedbackList.map((feedback, i) =>
            <li key={i}
                className={"list-box"}>
                <a href="javascript:void(0)" onClick={() => {
                    api.get('/feedback/getAllFeedback/' + feedback.id+ '/' + this.props.user.id).then(res => {
                        this.setState({
                            currentFeedback: res.data,
                            feedbackTitle: feedback.title
                        });
                    });
                    //this.setState({currentFeedback: feedback.id});
                }}>
                    {feedback.title}
                </a>
            </li>
        );

        return (
            <div className="Feedback">
                <div className="study-history">
                    <div className="title">스터디 History</div>
                    <div className="study-date">
                        <ul>{feedbackList}</ul>
                    </div>
                </div>
                <div className="study-feedback">
                    {this.props.user && this.state.currentFeedback.id != 0 ? (
                        <FeedbackContent userId={this.props.user.id} feedback={this.state.currentFeedback} title={this.state.feedbackTitle}  />
                    ) : null}
                </div>

            </div>
        );
    }
}

export default Feedback;
