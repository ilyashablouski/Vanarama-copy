import { TMP_OLAF_DATA } from './types';

export const captchaOlafData = (pageRef: string, data: {}) => (dispatch) => {
  dispatch({
    type: TMP_OLAF_DATA,
    payload: { pageRef, data },
  });
};
