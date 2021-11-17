import { IOption } from '../../types/detailsPage';
import { Nullable } from '../../types/common';

function getOptionFromList(
  array: { leadTime: string; options?: IOption[] }[],
  value: Nullable<string>,
): IOption {
  return array.reduce((acc, group) => {
    const foundValue = group?.options?.find(
      item => `${item?.optionId}` === value,
    );

    if (foundValue) {
      // eslint-disable-next-line no-param-reassign
      acc = foundValue;
    }

    return acc;
  }, {});
}

export default getOptionFromList;
