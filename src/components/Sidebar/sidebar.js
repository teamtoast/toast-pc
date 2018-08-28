import React, {Component} from 'react';
import './sidebar.scss'
import {NavLink} from "react-router-dom";

class Sidebar extends Component{
    render() { //class 형태의 Component에 필수로 있어야하는 함수_내부에서 JSX 리턴
        return (
            <ul className="menu-list">
                <li>
                    <NavLink exact to="/" activeClassName="active">
                        <img alt="home"
                             src={require('./img/ic-manu-w.png')}
                             srcSet={`
                             ${require('./img/ic-manu-w.png')} 300w,
                             ${require('./img/ic-manu-w@2x.png')} 768w,
                             ${require('./img/ic-manu-w@3x.png')} 1280w`}
                             className="ic_Manu_W"></img>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/" activeClassName="active">
                        <img alt="home"
                             src={require('./img/ic-home.png')}
                             srcSet={`
                             ${require('./img/ic-home.png')} 300w,
                             ${require('./img/ic-home@2x.png')} 768w,
                             ${require('./img/ic-home@3x.png')} 1280w`}
                             className="ic_Home"></img>
                        <br/>
                        <div className="menu-font">Home</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/study-category" activeClassName="active">
                        <img alt="study"
                             src={require('./img/ic-study.png')}
                             srcSet={`
                             ${require('./img/ic-study.png')} 300w,
                             ${require('./img/ic-study@2x.png')} 768w,
                             ${require('./img/ic-study@3x.png')} 1280w`}
                             className="ic_Study"></img>
                        <br/>
                        <div className="menu-font">Study</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/level-test" activeClassName="active">
                        <img alt="level"
                             src={require('./img/ic-level-test-active.png')}
                             srcSet={`
                             ${require('./img/ic-level-test-active.png')} 300w,
                             ${require('./img/ic-level-test-active@2x.png')} 768w,
                             ${require('./img/ic-level-test-active@3x.png')} 1280w`}
                             className="ic_LevelTest_active"></img>
                        <br/>
                        <div className="menu-font">Level Test</div>
                        </NavLink>
                </li>
            </ul>


        );
    }
}

export default Sidebar;