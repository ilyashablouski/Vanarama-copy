import { combineReducers } from 'redux';
import auth from './account/login/reducer';

export default combineReducers({
  auth,
});
