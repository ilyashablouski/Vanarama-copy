// eslint-disable-next-line import/prefer-default-export
export const findPreselectFilterValue = (
  value: string,
  data: string[] | null,
): string =>
  data?.find(
    element =>
      element.toLowerCase().replace(' ', '-') ===
      value.toLowerCase().replace(' ', '-'),
  ) || value;
