const MAX_PLACEHOLDER_LIST_LENGTH = 3;

// eslint-disable-next-line import/prefer-default-export
export function getProductPlaceholderList(productListLength: number) {
  const resultProductPlaceholderListLength =
    MAX_PLACEHOLDER_LIST_LENGTH - productListLength;

  return Array.from(
    { length: resultProductPlaceholderListLength },
    (_, index) => ({ capId: index }),
  );
}
