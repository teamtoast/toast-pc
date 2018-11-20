import React, {Component} from 'react'; //JSX 사용 위해 필
import './App.scss';
import '../components/Sidebar/sidebar.scss';
import Sidebar from '../components/Sidebar/sidebar';
import Header from "../components/header/header";
import Home from "../components/home/home";
import NoMatch from "../components/nomatch";
import {Route, Switch} from "react-router-dom";
import StudyCategory from "../components/studyCategory/studyCategory";
import StudyRoomList from "../components/StudyRoomList/studyRoomList";
import LevelTest from "../components/levelTest";
import LoginForm from "../components/loginForm/loginForm";
import RegisterForm from "../components/registerForm/registerForm";
import StudyRoom from "../components/StudyRoom/StudyRoom";
import StudyRoomStart from "../components/StudyRoom-Start/StudyRoomStart";
import api from '../api';
import Cookies from 'js-cookie';


class App extends Component { //Component 만드는 법 1. class 형태 , 2. 함수를 통

    constructor(props) {
        super(props);

        this.state = {
            loadComplete: false
        }

        let that = this;
        let authorization = Cookies.get('authorization');
        if(authorization) {
            api.get('/me', authorization).then(function(res) {
                that.setState({user: res.data, loadComplete: true});
            })
        }
        else
            this.state.loadComplete = true;
    }

    render() { //class 형태의 Component에 필수로 있어야하는 함수_내부에서 JSX 리턴
        if(this.state.loadComplete) {
            return (
                <div>
                    <div className="header">
                        <Header user={this.state.user} />
                    </div>
                    <div className="sidebar">
                        <Sidebar/>
                    </div>
                    <div className="content">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/home" component={Home} />
                            <Route exact path="/study" component={StudyCategory} />
                            <Route exact path="/study/:categoryID" component={StudyRoomList} />
                            <Route exact path="/study/:categoryID/:studyroomID" component={(props) => <StudyRoom user={this.state.user} {...props} />} />
                            <Route path="/level-test" component={LevelTest} />
                            <Route path="/login" component={LoginForm} />
                            <Route path="/register" component={RegisterForm} />
                            <Route component={NoMatch} />
                        </Switch>
                    </div>
                </div>
            );
        }
        else {
            return "";
        }
    }
}

//위 컴포넌트를 다른곳에서 사용가능하도록 export
//다른 파일에서 import로 사용가능
export default App;

