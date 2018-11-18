import React, {Component} from 'react';
import './sidebar.scss'
import {NavLink} from "react-router-dom";

class Sidebar extends Component {

    render() { //class 형태의 Component에 필수로 있어야하는 함수_내부에서 JSX 리턴
        const currentPath = window.location.pathname;

        return (
            <div className="Sidebar">
                <div className={"bar" + ((currentPath === '/')? " bar-home":
                    ((currentPath.includes('/study'))? " bar-study" :
                        ((currentPath.includes('/level-test'))? " bar-leveltest" :
                            ((currentPath.includes('/feedback'))? " bar-feedback": " bar-none"))))}/>

                <ul className="menu-list">
                    <li>
                        <NavLink exact to="/" activeClassName="active">
                            <img alt="home"
                                 src={require('./img/ic-manu-w@3x.png')}
                                 className="ic_Manu_W"/>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/" activeClassName="active">
                            {(currentPath === '/' ?
                                <img alt="home"
                                     src={require('./img/ic-home-active@3x.png')}
                                     className="ic_Home"/>
                                : <img alt="home"
                                       src={require('./img/ic-home@3x.png')}
                                       className="ic_Home"/>)}

                            <br/>
                            <div className={"menu-font" + (currentPath === '/' ? " active" : "")}>
                                Home
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/study" activeClassName="active">
                            {(currentPath.includes('/study') ?
                                <img alt="study"
                                     src={require('./img/ic-study-active@3x.png')}
                                     className="ic_Study"/>
                                : <img alt="study"
                                       src={require('./img/ic-study@3x.png')}
                                       className="ic_Study"/>)}
                            <br/>
                            <div className={"menu-font" + (currentPath.includes('/study') ? " active" : "")}>Study</div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/level-test" activeClassName="active">
                            {(currentPath === '/level-test' ?
                                <img alt="level"
                                     src={require('./img/ic-level-test-active@3x.png')}
                                     className="ic_LevelTest"/>
                                : <img alt="level"
                                       src={require('./img/ic-level-test@3x.png')}
                                       className="ic_LevelTest"/>)}
                            <br/>
                            <div className={"menu-font" + (currentPath === '/level-test' ? " active" : "")}>Level Test
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/feedback" activeClassName="active">
                            {(currentPath === '/feedback' ?
                                <img alt="level"
                                     src={require('./img/ic-feed-back-active@3x.png')}
                                     className="ic_LevelTest"/>
                                : <img alt="level"
                                       src={require('./img/ic-feed-back@3x.png')}
                                       className="ic_LevelTest"/>)}
                            <br/>
                            <div className={"menu-font" + (currentPath === '/feedback' ? " active" : "")}>Feedback
                            </div>
                        </NavLink>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Sidebar;