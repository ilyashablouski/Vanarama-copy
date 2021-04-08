/* eslint-disable @typescript-eslint/no-unused-expressions */

import {
  GetVehicleDetails_derivativeInfo_technicals,
  GetVehicleDetails_derivativeInfo_standardEquipments,
} from '../../../generated/GetVehicleDetails';

interface ITechDataItem {
  id: string;
  label: string;
  value: string;
}

interface ITechDataItemGroup {
  id: string;
  categoryDescription: string;
  items: ITechDataItem[];
}

export const getTechData = (
  derivativeInfo: (
    | GetVehicleDetails_derivativeInfo_technicals
    | GetVehicleDetails_derivativeInfo_standardEquipments
  )[],
): ITechDataItemGroup[] => {
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
      } = el as any;
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
    }, [] as ITechDataItemGroup[])
    ?.filter((el: ITechDataItemGroup) => el.items.length);
};

export default getTechData;
