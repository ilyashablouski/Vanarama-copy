import { TMP_OLAF_DATA } from './types';

// eslint-disable-next-line import/prefer-default-export
export const captchaOlafData = (pageRef: string, data: {}) => dispatch => {
  dispatch({
    type: TMP_OLAF_DATA,
    payload: { pageRef, data },
  });
};
