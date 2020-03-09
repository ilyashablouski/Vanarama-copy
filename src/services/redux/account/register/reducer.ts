import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE} from '../actionTypes';
import { RegisterState } from '../types';

export const initialState: RegisterState = {
  success: null, 
  error: null,
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case REGISTER_REQUEST:
        return { ...state, isRequesting: true };
    case REGISTER_SUCCESS:
        return { ...state, success: true };
    case REGISTER_FAILURE:
      return { ...state, success: false, error: action.payload};
    default:
      return state;
  }
}
