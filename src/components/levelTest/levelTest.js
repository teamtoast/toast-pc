import React, {Component} from 'react';
import './levelTest.scss'

class LevelTest extends Component{

    render() { //class 형태의 Component에 필수로 있어야하는 함수_내부에서 JSX 리턴

        return (
            <div className="LevelTest">
                <p className={"desc"}>
                    제시된 사진을 보고 <strong>30초</strong> 동안 설명할 내용을 준비한 후,
                    사진에 대해 <strong>1분</strong> 동안 설명하세요.
                </p>
                <br/>

                <img src={require('./img/img-level-test@3x.png')}
                     className="ic_Level_test" alt=""/>
                <br/>
                <img src={require('./img/ic-mic@3x.png')}
                     className="ic_Mic" alt=""/>

            </div>
        );
    }
}

export default LevelTest;