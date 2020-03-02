import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE} from '../actionTypes';
import { AuthState } from '../types';

export const initialState: AuthState = {
  authenticated: null, 
  data: null
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, data: null, isLoggingIn: true };
    case LOGIN_SUCCESS:
        return { ...state, authenticated: true, data: { token: action.payload } };
    case LOGIN_FAILURE:
      return { ...state, authenticated: false, data: null };
    default:
      return state;
  }
}
