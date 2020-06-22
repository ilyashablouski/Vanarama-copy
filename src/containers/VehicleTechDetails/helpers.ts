/* eslint-disable @typescript-eslint/no-unused-expressions */

export const getTechData = (derivativeInfo: any[]): any[] => {
  return derivativeInfo
    ?.reduce((arr, el) => {
      const index = arr.findIndex(
        (item: any) => item.categoryDescription === el.categoryDescription,
      );
      const {
        id,
        genericDescription,
        optionDescription,
        categoryDescription,
        technicalDescription,
        value,
      } = el;
      if (index !== -1) {
        (genericDescription || value) &&
          arr[index].items.push({
            id,
            label: genericDescription || technicalDescription,
            value: value || optionDescription,
          });
      } else {
        arr.push({
          id,
          categoryDescription,
          items:
            ((genericDescription || value) && [
              {
                id,
                label: genericDescription || technicalDescription,
                value: value || optionDescription,
              },
            ]) ||
            [],
        });
      }
      return arr;
    }, [] as any[])
    ?.filter((el: any) => el.items.length);
};

export default getTechData;
