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
import LevelTest from "../components/levelTest/levelTest";
import LoginForm from "../components/loginForm/loginForm";
import RegisterForm from "../components/registerForm/registerForm";
import StudyRoom from "../components/StudyRoom/StudyRoom";
import Feedback from "../components/feedback/feedback";
import api from '../api';
import Cookies from 'js-cookie';
import session from '../socket/session'
import rtc from '../components/StudyRoom-Start/js/rtc'


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

    handleSession = () =>  {
        if(!session.shouldAlive) {
            session.close();
            rtc.stop();
        }
        
        session.shouldAlive = false;
    }

    render() {
        this.handleSession();
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
                            <Route exact path="/study/:categoryId/:studyroomID" component={(props) => <StudyRoom user={this.state.user} {...props} />} />
                            <Route path="/level-test" component={LevelTest} />
                            <Route path="/login" component={LoginForm} />
                            <Route path="/register" component={RegisterForm} />
                            <Route path="/feedback" component={Feedback} />
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

