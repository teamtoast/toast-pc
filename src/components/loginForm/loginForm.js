import React from 'react';
import "./loginForm.scss"
import {NavLink} from "react-router-dom";
import axios from 'axios';

class LoginForm extends React.Component {
    state = {
        userState: 0,
        userID: '',
        userPassword: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        // 페이지 리로딩 방지
        e.preventDefault();
        // 상태값을 onCreate 를 통하여 부모에게 전달
        this.props.onCreate(this.state);
    }

    // facebookSubmit = () => {
    //     axios.get(`/login/facebook`)
    //         .then(res => {
    //             const url = res.url;
    //             this.
    //         })
    // }


    render() {
        return (
            <div className="Container LoginForm">
                <img src={require('./img/logo-login@3x.png')}
                     className="Logo_Login" alt=""/>
                <br/>

                <div className="Rectangle-18">
                    {/*facebook login*/}
                    <button onClick={this.facebookSubmit}>
                        <img src={require('./img/button-facebook-login@3x.png')}
                             className="Button_FacebookLogin" alt=""/>
                    </button>

                    {/*google login*/}
                    <button>
                        <img src={require('./img/button-google-login@3x.png')}
                             className="Button_GoogleLogin" alt=""/>
                    </button>

                    <div className="inLine inLine-Line2">
                        <div className="Line-2"/>
                        <div className="layer">또는</div>
                        <div className="Line-2"/>
                    </div>

                    <input className="Rectangle-19"
                           placeholder="이메일 주소 입력"/>
                    <input className="Rectangle-19"
                           placeholder="비밀번호 입력"/>


                    <div className="inLine inLine-icCheck">
                        <input type="checkbox" id="login-status"></input>
                        <label htmlFor="login-status" className="\-">로그인 상태 유지하기</label>
                    </div>

                    <button>
                        <img src={require('./img/button-login@3x.png')}
                             className="Button_Login" alt=""/>
                    </button>
                </div>
                <br/>
                <div className="Register-Link">
                    <div className="desc">계정이 없으신가요?</div>
                    <div><NavLink className="TOAST-" to="/register" activeClassName="active">TOAST 회원가입하기</NavLink>
                    </div>
                </div>
            </div>
        );
    }
};

export default LoginForm