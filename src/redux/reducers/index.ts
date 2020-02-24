import { combineReducers } from 'redux';

import sessionReducer from './session_reducer'
import olafReducer from './olaf_reducer'
import passwordRequestReducer from '../actions/account/reducer';

export default combineReducers({
  passwordRequestReducer,
  session: sessionReducer,
  olaf: olafReducer
});
