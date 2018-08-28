import React from 'react';
import { Container, Row, Col, Input, Button } from 'mdbreact';
import "./loginForm.scss"
import {NavLink} from "react-router-dom";

class LoginForm extends React.Component  {
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


    render() {
        return(
            <Container className="LoginForm">
                <img src={require('./img/logo-login.png')}
                     srcSet={`
                         ${require('./img/logo-login.png')} 300w,
                         ${require('./img/logo-login@2x.png')} 768w,
                         ${require('./img/logo-login@3x.png')} 1280w`}
                     className="Logo_Login"></img>

                <br/>

                <div className="Rectangle-18">
                    {/*facebook login*/}
                    <button>
                        <img src={require('./img/button-facebook-login.png')}
                             srcSet={`
                         ${require('./img/button-facebook-login.png')} 300w,
                         ${require('./img/button-facebook-login@2x.png')} 768w,
                         ${require('./img/button-facebook-login@3x.png')} 1280w`}
                             className="Button_FacebookLogin"></img>
                    </button>

                    {/*google login*/}
                    <button>
                        <img src={require('./img/button-google-login.png')}
                             srcSet={`
                         ${require('./img/button-google-login.png')} 300w,
                         ${require('./img/button-google-login@2x.png')} 768w,
                         ${require('./img/button-google-login@3x.png')} 1280w`}
                             className="Button_GoogleLogin"></img>
                    </button>

                    <div className="inLine inLine-Line2">
                        <div className="Line-2"></div><div className="layer">또는</div><div className="Line-2"></div>
                    </div>

                    <input className="Rectangle-19"
                           placeholder="이메일 주소 입력"></input>
                    <input className="Rectangle-19"
                           placeholder="비밀번호 입력"></input>

                    <img src="img/ic-check.png"
                         srcSet="img/ic-check@2x.png 2x,img/ic-check@3x.png 3x"
                         className="ic_Check"></img>

                    <div className="inLine inLine-icCheck">
                        <img src={require('./img/ic-check.png')}
                             srcSet={`
                             ${require('./img/ic-check.png')} 300w,
                             ${require('./img/ic-check@2x.png')} 768w,
                             ${require('./img/ic-check@3x.png')} 1280w`}
                             className="ic_Check"></img>

                        <div className="\-">로그인 상태 유지하기</div>
                    </div>

                    <button>
                        <img src={require('./img/button-login.png')}
                             srcSet={`
                             ${require('./img/button-login.png')} 300w,
                             ${require('./img/button-login@2x.png')} 768w,
                             ${require('./img/button-login@3x.png')} 1280w`}
                             className="Button_Login"></img>
                    </button>
                </div>
                <br/>
                <div className="Register-Link">
                    <div className="\-">계정이 없으신가요?</div>
                    <div><NavLink className="TOAST-" to="/register" activeClassName="active">TOAST 회원가입하기</NavLink></div>
                </div>



                {/*<form onSubmit={this.handleSubmit}>*/}
                    {/*<p className="h5 text-center mb-4">로그인</p>*/}
                    {/*<div className="grey-text">*/}
                        {/*<Input label="Type your ID" icon="envelope" group type="email" validate error="wrong" success="right"*/}
                               {/*value={this.state.userID}*/}
                               {/*onChange={this.handleChange}*/}
                               {/*name="userID"/>*/}

                        {/*<Input label="Type your Password" icon="lock" group type="password" validate*/}
                               {/*value={this.state.userPassword}*/}
                               {/*onChange={this.handleChange}*/}
                               {/*name="userPassword"/>*/}
                    {/*</div>*/}
                    {/*<div className="text-center">*/}
                        {/*<Button type="submit">확인</Button>*/}
                    {/*</div>*/}
                {/*</form>*/}

            </Container>
        );
    }
};

export default LoginForm