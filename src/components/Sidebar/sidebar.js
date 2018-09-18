import React, {Component} from 'react';
import './sidebar.scss'
import {NavLink} from "react-router-dom";

class Sidebar extends Component{
    render() { //class 형태의 Component에 필수로 있어야하는 함수_내부에서 JSX 리턴
        return (
            <ul className="menu-list">
                <li>
                    <NavLink exact to="/" activeClassName="active" >
                        <img alt="home"
                             src={require('./img/ic-manu-w@3x.png')}
                             className="ic_Manu_W"/>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/" activeClassName="active">
                        <img alt="home"
                             src={require('./img/ic-home@3x.png')}
                             className="ic_Home"/>
                        <br/>
                        <div className="menu-font">Home</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/study" activeClassName="active">
                        <img alt="study"
                             src={require('./img/ic-study@3x.png')}
                             className="ic_Study"/>
                        <br/>
                        <div className="menu-font">Study</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/level-test" activeClassName="active">
                        <img alt="level"
                             src={require('./img/ic-level-test@3x.png')}
                             className="ic_LevelTest"/>
                        <br/>
                        <div className="menu-font">Level Test</div>
                        </NavLink>
                </li>
            </ul>


        );
    }
}

export default Sidebar;