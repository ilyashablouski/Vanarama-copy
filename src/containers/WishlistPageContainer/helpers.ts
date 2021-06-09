const MAX_PLACEHOLDER_LIST_LENGTH = 3;

// eslint-disable-next-line import/prefer-default-export
export function getProductPlaceholderList(productListLength: number) {
  const productPlaceholderListLength =
    MAX_PLACEHOLDER_LIST_LENGTH - productListLength;
  const resultProductPlaceholderListLength =
    productPlaceholderListLength > 0 ? productPlaceholderListLength : 0;

  return Array.from(
    { length: resultProductPlaceholderListLength },
    (_, index) => ({ capId: index }),
  );
}
