import { IVehicle } from './comparatorHelpers';

export const getUniqueCriterias = data => {
  const criterias = [] as string[] | [];
  data?.vehicleComparator.forEach(item => {
    item.data.forEach(title => {
      if (!criterias.includes(title.name)) {
        criterias.push(title.name);
      }
    });
  });
  return criterias;
};

export const getValuesByCriteria = (criteria: string, data) => {
  return data.vehicleComparator.map(item => {
    return item.data.find(value => value.name === criteria).value;
  });
};

export const getHeading = (
  compareVehicles: [] | IVehicle[] | null | undefined,
) => {
  return {
    title: 'Heading',
    values: compareVehicles?.map(item => ({
      capId: item.capId,
      name: item.manufacturerName,
      description: item.derivativeName,
      image: item.imageUrl,
    })),
  };
};

export const getPrice = (
  compareVehicles: [] | IVehicle[] | null | undefined,
) => {
  return {
    title: 'Price',
    values: compareVehicles?.map(item => ({
      capId: item.capId,
      price: item.personalRate,
    })),
  };
};

export const getCriterials = (
  data,
  compareVehicles: [] | IVehicle[] | null | undefined,
) => {
  const result = [];
  const allCriterias = getUniqueCriterias(data);
  allCriterias.forEach(title => {
    result.push({
      title,
      values: getValuesByCriteria(title, data),
    });
  });

  if (allCriterias.length) {
    result.push(getHeading(compareVehicles));
    result.push(getPrice(compareVehicles));
  }

  return result;
};

export const getVehiclesIds = (
  vehiclesCompares: [] | IVehicle[] | null | undefined,
) => {
  return vehiclesCompares?.map(vehiclesCompare => ({
    capId: +vehiclesCompare.capId,
    vehicleType: vehiclesCompare.vehicleType,
  }));
};
