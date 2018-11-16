import React from 'react';
import {NavLink} from "react-router-dom";
import "./registerForm.scss"
import api from "../../api"
import Cookies from "js-cookie";
import {axios} from "axios";

class RegisterForm extends React.Component {
    state = {
        email: '',
        password: '',
        nickname: '',
        birth: '',
        gender: ''
    }

    handleSubmit = (e) => {
        console.log(this.state);
        const state = this.state;
        api.post(`/users`, state)
            .then(res => {
                if(res.status == 200) {
                    Cookies.set('token', res.data.token);
                    window.location.href = '/';
                }
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
                     src={require('./img/logo-login@3x.png')}
                     alt=""/>
                <br/>

                <div className="Rectangle-18">
                    {/*facebook signin*/}
                    <button onClick={this.facebookSiginin}>
                        <img src={require('./img/button-facebook-signup@3x.png')}
                             className="Button_FacebookSignup" alt=""/>
                    </button>

                    {/*google signin*/}
                    <button onClick={this.googleSiginin}>
                        <img src={require('./img/button-google-signup@3x.png')}
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
                                   this.setState({email: e.target.value})
                               }}/>

                        <div className="inLine inLine-icCheck">
                            <input type="checkbox" id="id-check"></input>
                            <label htmlFor="id-check" className="\-">중복확인</label>
                        </div>
                    </div>


                    <div className="input-group">
                        <div className="type">닉네임</div>
                        <input className="Rectangle-19"
                               placeholder="닉네임 입력"
                               type="text"
                               onChange={(e) => {
                                   this.setState({nickname: e.target.value})
                               }}/>
                    </div>

                    <div className="input-group">
                        <div className="type">비밀번호</div>
                        <input className="Rectangle-19"
                               placeholder="비밀번호 입력"
                               type="password" />
                        <input className="Rectangle-19 Rectangle-19-confirm"
                               placeholder="비밀번호 확인"
                               type="password"
                               onChange={(e) => {
                                   this.setState({password: e.target.value})
                               }}/>
                    </div>

                    <div className="input-group">
                        <div className="type">생년월일</div>
                        <input className="Rectangle-19"
                               placeholder="생년월일 입력 (예시: 960101)"
                               type="text"
                               onChange={(e) => {
                                   this.setState({birth: e.target.value})
                               }}/>
                    </div>

                    <div className="input-group">
                        <div className="type">성별</div>
                        <div className="Button_Gender">
                            <button
                                onClick={() => {
                                    this.setState({gender: "female"});
                                    console.log(this.state.gender);
                                }}
                                className={this.state.gender === "female" ? "Button_Woman active" : "Button_Woman"}>
                                여자
                            </button>

                            <button
                                onClick={() => {
                                    this.setState({gender: "male"});
                                    console.log(this.state.gender);
                                }}
                                className={this.state.gender === "male" ? "Button_Man active" : "Button_Man"}>
                                남자
                            </button>
                        </div>
                    </div>

                    <button onClick={this.handleSubmit}>
                        <img src={require('./img/button-signup@3x.png')}
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
