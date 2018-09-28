//imports
import {LOGIN, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT} from '../action/user'
// import {login} from "../action/user";


const userState = {
    isLoggedin: false,
    fetchingUpdate: false,
    user: {}
};



function userReducer (state = userState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                fetchingUpdate: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                fetchingUpdate: false,
                isLoggedIn: true,
                user: action.result,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                fetchingUpdate: false
            };
        default:
            return userState;
    }
};

export default userReducer;
