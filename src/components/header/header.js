import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import './header.scss'

class Header extends Component {
    render() {
        return (
            <div>
                <div className="logo">
                    <NavLink exact to="/" activeClassName="active">
                        <img alt="logo" src="/src/assets/image/logo-nav.png"
                             srcSet="/src/assets/image/logo-nav@2x.png 2x,/src/assets/image//logo-nav@3x.png 3x"
                             className="Logo_Nav" />
                    </NavLink>
                </div>
                <div className="profile">
                    <NavLink to="/login" activeClassName="active" >프로필</NavLink>
                </div>
            </div>
        );
    }
}

export default Header;
