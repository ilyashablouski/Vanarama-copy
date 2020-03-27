import { combineReducers } from 'redux';
import olafReducer from './olaf/reducer';

export default combineReducers({
  olaf: olafReducer,
});
