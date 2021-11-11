import { SelectOptionList } from 'core/atoms/custom-colors-select/interface';

function getFilteredList(optionData: (SelectOptionList | null)[]) {
  return optionData?.reduce<(SelectOptionList | null)[][]>((acc, outerItem) => {
    if (!acc.length) {
      acc.push([outerItem]);

      return acc;
    }

    const foundedIndex = acc.findIndex(item => {
      if (!item[0]) {
        return -1;
      }
      return outerItem?.leadTime === item[0].leadTime;
    });

    if (foundedIndex >= 0) {
      acc[foundedIndex].push(outerItem);
    } else {
      acc.push([outerItem]);
    }

    return acc;
  }, []);
}

function getStructuredList(
  optionList: (SelectOptionList | null)[] | null | undefined,
) {
  if (!optionList) {
    return null;
  }

  const onOfferItems = optionList.filter(item => item?.onOffer);
  const nonOfferItems = optionList.filter(item => !item?.onOffer);

  const filteredOnOfferItems = getFilteredList(onOfferItems);
  const filteredNonOfferItems = getFilteredList(nonOfferItems);

  return [...filteredOnOfferItems, ...filteredNonOfferItems];
}

export default getStructuredList;
