import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import './header.scss'

class Header extends Component {
    render() {
        return (
            <div>
                <div className="logo">
                    <NavLink exact to="/" activeClassName="active">토스트로고</NavLink>
                </div>
                <div className="profile">
                    <NavLink to="/home" activeClassName="active" >프로필</NavLink>
                </div>
            </div>
        );
    }
}

export default Header;
