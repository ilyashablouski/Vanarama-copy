import { combineReducers } from 'redux';

import sessionReducer from './session-reducer';
import olafReducer from '../olaf/reducer';
import passwordRequestReducer from '../account/reducer';

export default combineReducers({
  passwordRequestReducer,
  session: sessionReducer,
  olaf: olafReducer,
});
