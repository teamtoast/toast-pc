import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './header.scss'

class Header extends Component {
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


                <div className="login-btn">
                    <NavLink to="/login" activeClassName="active">
                        <img alt="logo"
                             src={require('./img/button-login@3x.png')}
                             className="Button_Login"/>
                        </NavLink>
                </div>
            </div>
        );
    }
}

export default Header;
