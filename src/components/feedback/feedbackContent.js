import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './feedback.scss'
import api from "../../api";
import * as axios from "axios";

export function GrammerFeedbackList(props) {
    let grammarFeedbacks;
    let feedbackResult = [];

    if (props.grammarFeedbacks) {
        grammarFeedbacks = props.grammarFeedbacks;
        for (let i = 0; i < grammarFeedbacks.length; i++) {
            let expression = grammarFeedbacks[i].expression;
            let grammarFeedback = grammarFeedbacks[i].grammarFeedback;

            let startIdx = 0;
            let offsetBefore = 0, lengthBefore = 0;
            if (grammarFeedback) {
                let feedbackPart = grammarFeedback.map((element, idx) => {
                        startIdx = offsetBefore + lengthBefore;
                        offsetBefore = element.offset;
                        lengthBefore = element.length;
                        return (
                            <li className={"feedback-sentence"}>
                                {(idx === 0) ? <p className={"feedback-idx"}>{i + 1}.</p> : null}
                                <p>{expression.substring(startIdx, element.offset)}</p>
                                <p className={"bad-word bad-word-" + (element.type)}>{expression.substr(element.offset, element.length)}</p>
                                <p className={"better-word better-word-" + (element.type)}>{element.better[0]}</p>
                                {(grammarFeedback.length === idx + 1) ?
                                    <p>{expression.substring(offsetBefore + lengthBefore, expression.length)}</p> : null}
                            </li>

                        );
                    }
                );
                feedbackResult.push(feedbackPart);
            }

        }
    }


    return (
        <ul className={"feedbackResult"}>{feedbackResult}</ul>
    );
}

class FeedbackContent extends Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            feedbackTotal: {
                "grammarFeedbacks": [
                    {
                        "expression": "Where is nearest hospital",
                        "grammarFeedback": [
                            {
                                "offset": 6,
                                "length": 10,
                                "bad": "is nearest",
                                "better": [
                                    "is the nearest"
                                ],
                                "type": "grammar"
                            }
                        ]
                    },
                    {
                        "expression": "My mother are a doctor, but my father is a angeneer",
                        "grammarFeedback": [
                            {
                                "offset": 10,
                                "length": 3,
                                "bad": "are",
                                "better": [
                                    "is"
                                ],
                                "type": "grammar"
                            },
                            {
                                "offset": 41,
                                "length": 1,
                                "bad": "a",
                                "better": [
                                    "an"
                                ],
                                "type": "spelling"
                            },
                            {
                                "offset": 43,
                                "length": 8,
                                "bad": "angeneer",
                                "better": [
                                    "engineer",
                                    "engender"
                                ],
                                "type": "spelling"
                            }
                        ]
                    },
                    {
                        "expression": "What is the nearest hospital"
                    }
                ],
                "recommendSentences": [
                    {
                        "question": "Where is nearest hospital",
                        "answer": "It’s 500 m far from my house."
                    },
                    {
                        "question": "My mother are a doctor, but my father is a angeneer",
                        "answer": "It adds structure to our social lives and connects us with our families and backgrounds."
                    },
                    {
                        "question": "What is the nearest hospital",
                        "answer": "Museums are an integral part of any country’s history, and they keep history alive."
                    }
                ],
                "poorPronunciation": ["nearest", "hospital"],
                "pronunciationScore": "Excellent",
                "grammarScore": "Intermediate",
                "wordScore": "Excellent",
                "expressionScore": "Great"
            },
            feedback: {},
            missedPronunciationList: [],
            recommendSentList: []
        };

        /*var that = this;
        var userId = this.props.userId;
        var studyroomId = this.props.currentFeedback;
        if (userId && studyroomId) {
            axios.get('https://api.toast-study.com' + '/feedback/getAllFeedback' + '/' + studyroomId+ '/' + userId).then(function (res) {
                that.setState({
                    feedbackTotal: res.data
                });
            });
        }*/
    }


    render() {


        this.state.feedback = this.props.currentFeedback;
        if (this.props.feedback.poorPronunciation) {
            this.state.missedPronunciationList = this.props.feedback.poorPronunciation.map((word, i) =>
                <li key={i} className="missed-pronunciation">
                    <p>{word}</p>
                    <img src={require('./img/button_sound.png')}
                         className="btn-sound" alt=""/>
                </li>
            );
        }

        if (this.props.feedback.recommendSentences) {
            this.state.recommendSentList = this.props.feedback.recommendSentences.map((qna, i) =>
                <li key={i} className="recommend-sentence">
                    <p>Q. {qna.question}</p>
                    <p>A. {qna.answer}</p>
                </li>
            );

        }

        return (
            <div>
                <div className="top-box">
                    <div className="feedback-date">
                        {/*{this.state.feedback.studyroomDate}*/}
                    </div>
                    <div className="feedback-title">
                        {this.props.title}
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
                            <GrammerFeedbackList grammarFeedbacks={this.props.feedback.grammarFeedbacks}/>
                        </div>
                    </div>
                    <div className="box box-2">
                        <p className="box-title">
                            토스트가 추천하는 표현
                        </p>
                        <div className="box-content">
                            <ul className="recommend-sentence-list">{this.state.recommendSentList}</ul>
                        </div>

                        <p className="box-title">
                            내가 실수했던 발음들 Check!
                        </p>
                        <div className="box-content">
                            <ul className="missed-pronunciation-list">{this.state.missedPronunciationList}</ul>
                        </div>

                    </div>
                    <div className="box box-3">
                        <p className="box-title">
                            나의 점수
                        </p>
                        <div className="box-content">
                            <div className="score">
                                <p>발음</p>
                                <div className={"score-box score-box-" + this.props.feedback.pronunciationScore}>
                                    {this.props.feedback.pronunciationScore}
                                </div>
                            </div>
                            <div className="score">
                                <p>문법</p>
                                <div className={"score-box score-box-" + this.props.feedback.grammarScore}>
                                    {this.props.feedback.grammarScore}

                                </div>
                            </div>
                            <div className="score">
                                <p>단어</p>
                                <div className={"score-box score-box-" + this.props.feedback.wordScore}>
                                    {this.props.feedback.wordScore}

                                </div>
                            </div>
                            <div className="score">
                                <p>표현</p>
                                <div className={"score-box score-box-" + this.props.feedback.expressionScore}>
                                    {this.props.feedback.expressionScore}

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        );
    }
}

export default FeedbackContent;