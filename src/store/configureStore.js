import {createStore, combineReducers} from 'redux';
import userReducer from '../reducer/user.js';

const reducer = combineReducers({
    user: userReducer
});

const store = createStore(reducer);
export default store;

