// import number from './number';
import demo from './demo';
import match from './match';
import { combineReducers } from 'redux';

export default combineReducers({
    demo: demo,
    match: match,
});