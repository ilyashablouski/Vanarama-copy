import { ParsedUrlQuery } from 'querystring';

import { setObjectAsSessionStorage } from '../../utils/windowSessionStorage';

// eslint-disable-next-line import/prefer-default-export
export const onSavePagePosition = (
  offerPosition: number,
  queries: ParsedUrlQuery,
) => {
  const storageObject = {
    offerPosition,
    queries,
    scrollPosition: window.pageYOffset,
  };
  setObjectAsSessionStorage('searchPageScrollData', storageObject);
};
