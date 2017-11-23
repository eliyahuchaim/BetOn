import {combineReducers} from 'redux';
import usersReducer from './userReducers';
import indexReducer from './indexReducer';


export default combineReducers({
  user: usersReducer,
  index: indexReducer
});
