import { TMP_OLAF_DATA } from '../types';

export const captchaFormData = (pageRef: string, data: {}) => {
  return (dispatch) => {
    return dispatch({
      type: TMP_OLAF_DATA,
      payload: { pageRef, data },
    });
  };
};
