import { combineReducers } from 'redux';
import initReducer from './init_reducer';
import sessionReducer from './session_reducer';
import passwordRequestReducer from '../actions/account/reducer';

export default combineReducers({
  passwordRequestReducer,
  initialize: initReducer,
  session: sessionReducer,
});
