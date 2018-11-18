import React from 'react';
import "./loginForm.scss"
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";
import {login} from "../../action/user";
import {connect} from "react-redux";
import api from '../../api';
import Cookies from 'js-cookie';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

class LoginForm extends React.Component {
    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    }

    emailField = null;
    passwordField = null;

    handleSubmit = (e) => {
        api.post('/token', {
            email: this.emailField.value,
            password: this.passwordField.value
        }).then(function(res) {
            Cookies.set('authorization', 'Bearer ' + res.data.token);
            window.location.href = '/';
        }).catch(error => {
            alert('이메일과 비밀번호를 확인해주세요.');
        });
    }

    handleFacebookLogin(response) {
        api.post('/token/sns', {token: response.accessToken, type: 'FACEBOOK'}).then(function(res) {
            Cookies.set('authorization', 'Bearer ' + res.data.token);
            window.location.href = '/';
        }).catch(error => {
            if(error.response.status == 401) {
                alert('먼저 회원가입을 해주세요.');
            }
        });
    }


    render() {
        const {user} = this.props;

        return (
            user.isLoggedIn
                ? <div>로그인 성공</div>
                :
                <div className="Container LoginForm">
                    <img src={require('./img/logo-login@3x.png')}
                         className="Logo_Login" alt=""/>
                    <br/>

                    <div className="Rectangle-18">
                        {/*facebook login*/}

                        <FacebookLogin
                            appId="1920112471405816"
                            callback={this.handleFacebookLogin}
                            render={renderProps => (
                                <button onClick={renderProps.onClick}>
                                    <img src={require('./img/button-facebook-login@3x.png')}
                                        className="Button_FacebookLogin" alt=""/>
                                </button>
                            )}
                            />

                        {/*google login*/}
                        {/*<button>
                            <img src={require('./img/button-google-login@3x.png')}
                                 className="Button_GoogleLogin" alt=""/>
                        </button>*/}

                        <div className="inLine inLine-Line2">
                            <div className="Line-2"/>
                            <div className="layer">또는</div>
                            <div className="Line-2"/>
                        </div>

                        <input className="Rectangle-19" type="text"
                               placeholder="이메일 주소 입력" ref={(ref) => {
                            this.emailField = ref;
                        }}/>
                        <input className="Rectangle-19" type="password"
                               placeholder="비밀번호 입력" ref={(ref) => {
                            this.passwordField = ref;
                        }}/>


                        <div className="inLine inLine-icCheck">
                            <input type="checkbox" id="login-status"></input>
                            <label htmlFor="login-status" className="\-">로그인 상태 유지하기</label>
                        </div>

                        <button type="button" className="Button_Login" onClick={this.handleSubmit}>
                            로그인
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

function mapStateToProps(state) {
    return {user: state.user}
}

export default connect(mapStateToProps)(LoginForm);