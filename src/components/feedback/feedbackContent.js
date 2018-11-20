import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './feedback.scss'
import Api from "../../api";

export function GrammerFeedbackList(props) {
    let grammarFeedbacks;
    let feedbackResult = [];

    if(props.grammarFeedbacks) {
        grammarFeedbacks=props.grammarFeedbacks;
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
        this.state = {
            feedbackTotal: {},
            feedback: {},
            missedPronunciationList: [],
            recommendSentList: []
        };

    }


    render() {

        var that = this;
        let path = "home/ubuntu/speeches_saved";
        Api.getParam('/feedback/getAllFeedback', path).then(function (res) {
            that.setState({
                feedbackTotal: res.data
            });
        });
        if (this.state.feedbackTotal) {
            this.state.feedback = this.props.feedback;
            if(this.state.feedbackTotal.poorPronunciation) {
                this.state.missedPronunciationList = this.state.feedbackTotal.poorPronunciation.map((word, i) =>
                    <li className="missed-pronunciation">
                        <p>{word}</p>
                        <img src={require('./img/button_sound.png')}
                             className="btn-sound" alt=""/>
                    </li>
                );
            }

            if(this.state.feedbackTotal.recommendSentences) {
                this.state.recommendSentList = this.state.feedbackTotal.recommendSentences.map((qna, i) =>
                    <li className="recommend-sentence">
                        <p>Q. {qna.question}</p>
                        <p>A. {qna.answer}</p>
                    </li>
                );

            }

        }

        return (
            <div>
                <div className="top-box">
                    <div className="feedback-date">
                        {this.state.feedback.studyroomDate}
                    </div>
                    <div className="feedback-title">
                        {this.state.feedback.studyroomTitle}
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
                            <GrammerFeedbackList grammarFeedbacks={this.state.feedbackTotal.grammarFeedbacks}/>
                        </div>
                    </div>
                    <div className="box box-2">
                        <p className="box-title">
                            토스트가 추천하는 표현
                        </p>
                        <div className="box-content">
                            <ul className="recommend-sentence-list">{this.state.ecommendSentList}</ul>
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
                                <div className={"score-box score-box-" + this.state.feedbackTotal.pronunciationScore}>
                                    {this.state.feedbackTotal.pronunciationScore}
                                </div>
                            </div>
                            <div className="score">
                                <p>문법</p>
                                <div className={"score-box score-box-" + this.state.feedbackTotal.grammarScore}>
                                    {this.state.feedbackTotal.grammarScore}

                                </div>
                            </div>
                            <div className="score">
                                <p>단어</p>
                                <div className={"score-box score-box-" + this.state.feedbackTotal.wordScore}>
                                    {this.state.feedbackTotal.wordScore}

                                </div>
                            </div>
                            <div className="score">
                                <p>표현</p>
                                <div className={"score-box score-box-" + this.state.feedbackTotal.expressionScore}>
                                    {this.state.feedbackTotal.expressionScore}

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