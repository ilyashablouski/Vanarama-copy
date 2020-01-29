import { combineReducers } from 'redux';
import initReducer from './init_reducer';
import sessionReducer from './session_reducer'

export default combineReducers({
  initialize: initReducer,
  session: sessionReducer
});