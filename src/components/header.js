import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div className="header">
                <NavLink className="" exact to="/" activeClassName="active">토스트로고</NavLink>
                <NavLink to="/home" activeClassName="active" >프로필</NavLink>
            </div>
        );
    }
}

export default Header;
