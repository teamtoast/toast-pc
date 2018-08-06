import React, {Component} from 'react'; //JSX 사용 위해 필
import './App.scss';
import '../components/Sidebar/sidebar.scss';
import Sidebar from '../components/Sidebar/sidebar';
import Header from "../components/header";
import Home from "../components/home";
import LoginForm from "../components/loginForm";
import RegisterForm from "../components/registerForm";
import NoMatch from "../components/nomatch";
import { Route, Switch} from "react-router-dom";



class App extends Component { //Component 만드는 법 1. class 형태 , 2. 함수를 통

    // handleCreate = (data) => {
    //     console.log(data);
    // }

    render() { //class 형태의 Component에 필수로 있어야하는 함수_내부에서 JSX 리턴
        return (
            <div className="app">
                <div className="header">
                    <Header/>
                </div>
                <div className="sidebar">
                    <Sidebar/>
                </div>
                <div className="content">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/home" component={Home} />
                        <Route path="/login" component={LoginForm} />
                        <Route path="/register" component={RegisterForm} />
                        <Route component={NoMatch} />
                    </Switch>
                </div>
            </div>
        );
    }
}

//위 컴포넌트를 다른곳에서 사용가능하도록 export
//다른 파일에서 import로 사용가능
export default App;

