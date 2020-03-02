import { combineReducers } from 'redux';
import auth from './account/login/reducer';
import olafReducer from 'redux/olaf/reducer';

export default combineReducers({
  auth,
  olaf: olafReducer,
});
