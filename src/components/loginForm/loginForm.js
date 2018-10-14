import React from 'react';
import "./loginForm.scss"
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";
import {login} from "../../action/user";
import {connect} from "react-redux";

class LoginForm extends React.Component {
    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    }


    handleSubmit = (e) => {
        // 페이지 리로딩 방지
        e.preventDefault();
        // const {dispatch} = this.props;
        // const userID = this.userID.value;
        // const userPassword = this.userPassword.value;
        // dispatch(login(userID, userPassword));
        //

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

                        <input className="Rectangle-19" type="text"
                               placeholder="이메일 주소 입력" ref={(ref) => {
                            this.userID = ref;
                        }}/>
                        <input className="Rectangle-19" type="password"
                               placeholder="비밀번호 입력" ref={(ref) => {
                            this.userPassword = ref;
                        }}/>


                        <div className="inLine inLine-icCheck">
                            <input type="checkbox" id="login-status"></input>
                            <label htmlFor="login-status" className="\-">로그인 상태 유지하기</label>
                        </div>

                        <button className="Button_Login">
                            {/*<img src={require('./img/button-login@3x.png')}*/}
                                 {/*className="Button_Login"*/}
                                 {/*onClick={this.handleSubmit} alt=""/>*/}
                            <a href="http://localhost:3000">로그인</a>
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