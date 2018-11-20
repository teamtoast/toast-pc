import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './header.scss'
import Cookies from 'js-cookie'

class Header extends Component {

    logout() {
        Cookies.remove('authorization');
        window.location.href = '/';
    }

    render() {
        return (
            <div className="Header">
                <div className="logo">
                    <NavLink exact to="/" activeClassName="active">
                        <img alt="logo"
                             src={require('./img/logo-nav@3x.png')}
                             className="Logo_Nav"/>
                    </NavLink>
                </div>

                {this.props.user ? (
                    <div id="login-info">
                        <div id="top-nickname"><b>{ this.props.user.nickname }</b>님</div>
                        <a href="javascript:void(0)" onClick={ this.logout }>로그아웃</a>
                    </div>
                ) : (
                    <div className="login-btn">
                        <NavLink to="/login" activeClassName="active">
                            <img alt="logo"
                                src={require('./img/button-login@3x.png')}
                                className="Button_Login"/>
                            </NavLink>
                    </div>
                )
                }
                
            </div>
        );
    }
}

export default Header;
