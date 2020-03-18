import { TMP_OLAF_DATA } from './types';

const initialState = {
  aboutYou: null,
  addressHistory: null,
  employmentHistory: null,
  expenses: null,
  bankDetails: null,
  summary: null,
};

export default (state = initialState, action) => {
  const { pageRef, data } = action.payload || {};
  switch (action.type) {
    case TMP_OLAF_DATA:
      return { ...state, [pageRef]: { ...state[pageRef], data } };
    default:
      return state;
  }
};
