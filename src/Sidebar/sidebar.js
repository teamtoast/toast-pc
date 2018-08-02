import React, {Component} from 'react';
import LoginForm from "../loginForm";
import RegisterForm from "../registerForm";
import './sidebar.scss'

class Sidebar extends Component{
    render() { //class 형태의 Component에 필수로 있어야하는 함수_내부에서 JSX 리턴
        return (
            <div className="Sidebar">
                <LoginForm onCreate={this.handleCreate}/>
                <RegisterForm onCreate={this.handleCreate}/>
            </div>
        );
    }
}

export default Sidebar;