import { combineReducers } from 'redux';
import auth from './account/login/reducer';
import register from './account/register/reducer';
import olafReducer from './olaf/reducer';

export default combineReducers({
  auth,
  register,
  olaf: olafReducer,
});
