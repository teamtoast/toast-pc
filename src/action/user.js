//actions
export const LOGIN = 'LOGIN';
export const LOGIN_REQUEST = 'USERS_LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'USERS_LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'USERS_LOGIN_FAILURE';
export const LOGOUT = 'USERS_LOGOUT';

//action creators
export const login = (userID, userPassword) => {
    return {
        type: LOGIN,
        promise: {method: 'post', url: '/login', data: {userID, userPassword}}
    };
};