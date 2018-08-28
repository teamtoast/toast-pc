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
                             src={require('./img/logo-nav.png')}
                             srcSet={`
                         ${require('./img/logo-nav.png')} 300w,
                         ${require('./img/logo-nav@2x.png')} 768w,
                         ${require('./img/logo-nav@3x.png')} 1280w`}
                             className="Logo_Nav"></img>
                    </NavLink>
                </div>


                <div className="login-btn">
                    <NavLink to="/login" activeClassName="active">
                        <img alt="logo"
                             src={require('./img/button-login.png')}
                             srcSet={`
                         ${require('./img/button-login.png')} 300w,
                         ${require('./img/button-login@2x.png')} 768w,
                         ${require('./img/button-login@3x.png')} 1280w`}
                             className="Button_Login">
                        </img>
                        </NavLink>
                </div>
            </div>
        );
    }
}

export default Header;
