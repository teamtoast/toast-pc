import React from 'react';
import {NavLink} from "react-router-dom";
import "./registerForm.scss"
import api from "../../api"
import Cookies from "js-cookie";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

class RegisterForm extends React.Component {
    state = {
        email: '',
        password: '',
        nickname: '',
        birth: '',
        gender: '',
        hideSNS: false
    }

    token = '';
    type = '';

    handleSubmit = (e) => {
        console.log(this.state);
        const state = this.state;
        let callback = res => {
            if(res.status == 200) {
                Cookies.set('authorization', 'Bearer ' + res.data.token);
                window.location.href = '/';
            }
        };

        if(this.state.hideSNS) {
            api.post(`/users/sns`, {
                'token': this.token,
                'type': this.type,
                'nickname': this.state.nickname,
                'gender': this.state.gender
            }).then(callback)
        }
        else {
            api.post(`/users`, {
                'email': this.state.email,
                "password": this.state.password,
                'nickname': this.state.nickname,
                'gender': this.state.gender
            }).then(callback)
        }
    }

    handleFacebookLogin = (response) => {
        api.post('/token/sns', {token: response.accessToken, type: 'FACEBOOK'}).then(res => {
            Cookies.set('authorization', 'Bearer ' + res.data.token);
            window.location.href = '/';
        }).catch(error => {
            if(error.response.status == 401) {
                this.token = response.accessToken;
                this.type = 'FACEBOOK';
                this.setState({hideSNS: true});
            }
        });
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
                    {!this.state.hideSNS && [
                    <FacebookLogin
                        appId="1920112471405816"
                        callback={this.handleFacebookLogin}
                        render={renderProps => (
                            <button class="hide-sns" onClick={renderProps.onClick}>
                                <img src={require('./img/button-facebook-signup@3x.png')}
                                    className="Button_FacebookSignup" alt=""/>
                            </button>
                        )}
                        />,

                   
                    /*<button class="hide-sns" onClick={this.googleSiginin}>
                        <img src={require('./img/button-google-signup@3x.png')}
                             className="Button_GoogleSignup" alt=""/>
                    </button>,*/

                    <div className="inLine inLine-Line2 hide-sns">
                        <div className="Line-2"/>
                        <div className="layer">또는</div>
                        <div className="Line-2"/>
                    </div>,

                    <div className="input-group input-group-email hide-sns">
                        <div className="type">이메일주소</div>
                        <input className="Rectangle-19"
                               placeholder="이메일 주소 입력"
                               type="text"
                               onChange={(e) => {
                                   this.setState({email: e.target.value})
                               }}/>

                        <div className="inLine inLine-icCheck hide-sns">
                            <input type="checkbox" id="id-check"></input>
                            <label htmlFor="id-check" className="\-">중복확인</label>
                        </div>
                    </div>]
                    }


                    <div className="input-group">
                        <div className="type">닉네임</div>
                        <input className="Rectangle-19"
                               placeholder="닉네임 입력"
                               type="text"
                               onChange={(e) => {
                                   this.setState({nickname: e.target.value})
                               }}/>
                    </div>

                    {!this.state.hideSNS && [
                    <div className="input-group hide-sns">
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
                    </div>,

                    <div className="input-group hide-sns">
                        <div className="type">생년월일</div>
                        <input className="Rectangle-19"
                               placeholder="생년월일 입력 (예시: 960101)"
                               type="text"
                               onChange={(e) => {
                                   this.setState({birth: e.target.value})
                               }}/>
                    </div>
                    ]}

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
                <div className="Login-Link hide-sns">
                    <div className="desc">이미 계정이 있으신가요?</div>
                    <div><NavLink className="TOAST-" to="/login" activeClassName="active">TOAST 로그인하기</NavLink>
                    </div>
                </div>

            </div>
        );
    }
};

export default RegisterForm
