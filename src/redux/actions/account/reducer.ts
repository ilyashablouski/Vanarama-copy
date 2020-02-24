import * as Immutable from 'seamless-immutable';
import { PASSWORD_REQUEST, PASSWORD_RESET } from './types';

export const initialState = Immutable({
  success: false,
});

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case PASSWORD_REQUEST:
      return { ...state, success: action.payload };
    case PASSWORD_RESET:
      return { ...state, success: action.payload };
    default:
      return state;
  }
}
