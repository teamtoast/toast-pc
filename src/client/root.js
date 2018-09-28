import React, {Component} from 'react';
import App from "../shared/App";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "../store/configureStore";


class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        );
    };
}


export default Root;