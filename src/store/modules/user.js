import {createActions, handleActions} from "redux-actions";

//action type
const LOGIN = 'user/LOGIN';
const LOGOUT = 'user/LOGOUT';

//action function
export const login = createActions(LOGIN);
export const logout = createActions(LOGOUT);

//module initial state
const initialState = {
    userState: 1
}

//reducer(action function object, initialstate)
export default handleActions({
    [LOGIN]: (state, action) => {
        return { userState: 1 }
    },
    [LOGOUT]: ({ userState }) => ({ userState: 0 })
}, initialState);