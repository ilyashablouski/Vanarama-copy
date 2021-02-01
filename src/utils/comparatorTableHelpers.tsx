import { ICriterias } from 'core/organisms/comparator-table/interface';
import { IVehicle } from './comparatorHelpers';
import { vehicleComparator } from '../../generated/vehicleComparator';

export const getUniqueCriterias = (data: vehicleComparator | undefined) => {
  const criterias: (string | undefined | null)[] = [];
  data?.vehicleComparator?.forEach(item => {
    item?.data?.forEach(title => {
      if (!criterias.includes(title?.name)) {
        criterias.push(title?.name);
      }
    });
  });
  return criterias;
};

export const getValuesByCriteria = (
  criteria: string | undefined | null,
  data: vehicleComparator | undefined,
) => {
  return (
    data?.vehicleComparator?.map(item => {
      const currentCriteria = item?.data?.find(
        value => value?.name === criteria,
      );
      return currentCriteria?.value || '';
    }) || ['']
  );
};

export const getHeading = (
  compareVehicles: [] | IVehicle[] | null | undefined,
) => {
  const currentCompareVehicles = compareVehicles as IVehicle[];
  return {
    title: 'Heading',
    values: currentCompareVehicles?.map(item => ({
      capId: item.capId || '',
      name: item.manufacturerName || '',
      description: item.derivativeName || '',
      image: item.imageUrl || '',
    })),
  };
};

export const getPrice = (
  compareVehicles: [] | IVehicle[] | null | undefined,
) => {
  if (!compareVehicles?.length) return null;
  const currentCompareVehicles = compareVehicles as IVehicle[];
  return {
    title: 'Price',
    values: currentCompareVehicles?.map(item => ({
      capId: item.capId || '',
      price: item.businessRate || 0,
    })),
  };
};

export const getCriterials = (
  data: vehicleComparator | undefined,
  compareVehicles: [] | IVehicle[] | null | undefined,
): ICriterias[] => {
  const result: ICriterias[] = [];
  const allCriterias = getUniqueCriterias(data);
  allCriterias.forEach(title => {
    if (title) {
      result.push({
        title,
        values: getValuesByCriteria(title, data),
      });
    }
  });

  if (result.length) {
    result.push(getHeading(compareVehicles));
    const price = getPrice(compareVehicles);
    if (price) {
      result.push(price);
    }
  }

  return result;
};

export const getVehiclesIds = (
  vehiclesCompares: [] | IVehicle[] | null | undefined,
) => {
  if (!vehiclesCompares?.length) return [];
  const currentCompareVehicles = vehiclesCompares as IVehicle[];
  return currentCompareVehicles?.map(vehiclesCompare => ({
    capId: +(vehiclesCompare.capId || 0),
    vehicleType: vehiclesCompare?.vehicleType,
  }));
};
