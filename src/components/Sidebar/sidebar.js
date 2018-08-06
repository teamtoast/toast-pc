import React, {Component} from 'react';
import './sidebar.scss'
import {NavLink} from "react-router-dom";

class Sidebar extends Component{
    render() { //class 형태의 Component에 필수로 있어야하는 함수_내부에서 JSX 리턴
        return (
            <ul className="page-list">
                <li>
                    <NavLink exact to="/" activeClassName="active">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/study-category" activeClassName="active">Study</NavLink>
                </li>
                <li>
                    <NavLink to="/level-test" activeClassName="active">Level Test</NavLink>
                </li>
            </ul>
        );
    }
}

export default Sidebar;