// eslint-disable-next-line import/prefer-default-export
export function addEtc(pagesArray: number[]): string[] {
  const stringPagesArray = pagesArray.map(page => page.toString());
  if (pagesArray.length <= 1) {
    return stringPagesArray;
  }
  const lastPage = pagesArray[pagesArray.length - 1];
  const secondLast = pagesArray[pagesArray.length - 2];
  if (lastPage !== secondLast + 1) {
    stringPagesArray.splice(pagesArray.length - 1, 0, '...');
  }
  if (pagesArray[0] + 1 !== pagesArray[1]) {
    stringPagesArray.splice(1, 0, '...');
  }
  return stringPagesArray;
}
