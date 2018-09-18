import React from 'react';
import {NavLink} from "react-router-dom";
import "./registerForm.scss"
import {axios} from "axios";

class RegisterForm extends React.Component {
    state = {
        userID: '',
        userPassword: '',
        userNickname: '',
        userBirth: '',
        userGender: ''
    }

    handleSubmit = (e) => {
        console.log(this.state);
        const state = this.state;
        axios.post(`/siginin`, {state})
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    facebookSiginin = () => {

    }

    googleSiginin = () => {

    }

    render() {
        return (
            <div className="Container RegisterForm">
                <img className="Logo_Login"
                     src={require('./img/logo-login.png')}
                     srcSet={`
                     ${require('./img/logo-login.png')} 300w,
                     ${require('./img/logo-login@2x.png')} 768w,
                     ${require('./img/logo-login@3x.png')} 1280w`} alt=""/>
                <br/>

                <div className="Rectangle-18">
                    {/*facebook signin*/}
                    <button onClick={this.facebookSiginin}>
                        <img src={require('./img/button-facebook-signup.png')}
                             srcSet={`
                             ${require('./img/button-facebook-signup.png')} 300w,
                             ${require('./img/button-facebook-signup@2x.png')} 768w,
                             ${require('./img/button-facebook-signup@3x.png')} 1280w`}
                             className="Button_FacebookSignup" alt=""/>
                    </button>

                    {/*google signin*/}
                    <button onClick={this.googleSiginin}>
                        <img src={require('./img/button-google-signup.png')}
                             srcSet={`
                         ${require('./img/button-google-signup.png')} 300w,
                         ${require('./img/button-google-signup@2x.png')} 768w,
                         ${require('./img/button-google-signup@3x.png')} 1280w`}
                             className="Button_GoogleSignup" alt=""/>
                    </button>

                    <div className="inLine inLine-Line2">
                        <div className="Line-2"/>
                        <div className="layer">또는</div>
                        <div className="Line-2"/>
                    </div>

                    <div className="input-group input-group-email">
                        <div className="type">이메일주소</div>
                        <input className="Rectangle-19"
                               placeholder="이메일 주소 입력"
                               type="text"
                               onChange={(e) => {
                                   this.setState({userID: e.target.value})
                               }}/>

                        <div className="inLine inLine-icCheck">
                            <img src={require('../loginForm/img/ic-check.png')}
                                 srcSet={`
                             ${require('../loginForm/img/ic-check.png')} 300w,
                             ${require('../loginForm/img/ic-check@2x.png')} 768w,
                             ${require('../loginForm/img/ic-check@3x.png')} 1280w`}
                                 className="ic_Check" alt=""/>

                            <div className="desc">중복확인</div>
                        </div>
                    </div>



                    <div className="input-group">
                        <div className="type">닉네임</div>
                        <input className="Rectangle-19"
                               placeholder="닉네임 입력"
                               type="text"
                               onChange={(e) => {
                                   this.setState({userNickname: e.target.value})
                               }}/>
                    </div>

                    <div className="input-group">
                        <div className="type">비밀번호</div>
                        <input className="Rectangle-19"
                               placeholder="비밀번호 입력"/>
                        <input className="Rectangle-19 Rectangle-19-confirm"
                               placeholder="비밀번호 확인"
                               type="text"
                               onChange={(e) => {
                                   this.setState({userPassword: e.target.value})
                               }}/>
                    </div>

                    <div className="input-group">
                        <div className="type">생년월일</div>
                        <input className="Rectangle-19"
                               placeholder="생년월일 입력 (예시: 960101)"
                               type="text"
                               onChange={(e) => {
                                   this.setState({userBirth: e.target.value})
                               }}/>
                    </div>

                    <div className="input-group">
                        <div className="type">성별</div>
                        <div className="Button_Gender">
                            <button className="Button_Woman"
                                    onClick={() => {
                                        this.setState({userBirth: 'Woman'})
                                    }}> 여자
                            </button>
                            <button className="Button_Man"
                                    onClick={() => {
                                        this.setState({userBirth: 'Man'})
                                    }}>남자
                            </button>
                        </div>
                    </div>

                    <button onClick={this.handleSubmit}>
                        <img src={require('./img/button-signup.png')}
                             srcSet={`
                             ${require('./img/button-signup.png')} 300w,
                             ${require('./img/button-signup@2x.png')} 768w,
                             ${require('./img/button-signup@3x.png')} 1280w`}
                             className="Button_Signup" alt=""/>
                    </button>
                </div>
                <br/>
                <div className="Login-Link">
                    <div className="desc">이미 계정이 있으신가요?</div>
                    <div><NavLink className="TOAST-" to="/login" activeClassName="active">TOAST 로그인하기</NavLink>
                    </div>
                </div>

            </div>
        );
    }
};

export default RegisterForm
