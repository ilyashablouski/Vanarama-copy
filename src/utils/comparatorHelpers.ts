import localForage from 'localforage';
import { VehicleTypeEnum } from '../../generated/globalTypes';
import { GetProductCard_productCard as ICard } from '../../generated/GetProductCard';
import { ProductCardData_productCarousel as ICardCarousel } from '../../generated/ProductCardData';

export interface ICompareVehicle {
  capId: string | null;
  derivativeName: string | null;
  manufacturerName: string | null;
  rangeName: string | null;
}

export interface IVehicle extends ICard {
  bodyStyle?: string | null | undefined;
  pageUrl?: IProductPageUrl;
}

export interface IVehicleCarousel extends ICardCarousel {
  bodyStyle?: string | null | undefined;
  pageUrl?: IProductPageUrl;
}

export interface ICapId {
  capId: string | number;
}

export interface IProductPageUrl {
  url: string;
  href: string;
  capId: string;
}

export const changeCompares = async (
  vehicle: IVehicle | IVehicleCarousel | null,
  capId?: string | number,
) => {
  const arrayCompares = (await localForage.getItem('compares')) as
    | IVehicle[]
    | IVehicleCarousel[]
    | null;

  // if compares already exist
  if ((arrayCompares && vehicle) || capId) {
    if (
      capId ||
      arrayCompares?.some(
        (compare: IVehicle | IVehicleCarousel) =>
          `${compare.capId}` === `${vehicle?.capId}`,
      )
    ) {
      // delete vehicle from compare
      const deletedVehicle = arrayCompares?.find(
        (compare: IVehicle | ICompareVehicle | IVehicleCarousel) =>
          `${compare.capId}` === `${vehicle?.capId}` ||
          `${compare.capId}` === `${capId}`,
      );
      if (deletedVehicle) {
        const index = arrayCompares?.indexOf(deletedVehicle);
        if (index !== undefined && index > -1) {
          arrayCompares?.splice(index, 1);
        }
        await localForage.setItem('compares', arrayCompares);
      }
      return arrayCompares;
    }

    if (arrayCompares && arrayCompares?.length < 3) {
      // add vehicle to compare
      await localForage.setItem('compares', [...arrayCompares, vehicle]);

      return [...arrayCompares, vehicle];
    }
    return arrayCompares;
  }

  await localForage.setItem('compares', vehicle ? [vehicle] : []);
  return vehicle ? [vehicle] : [];
};

export const isCorrectCompareType = (
  data?: IVehicle | IVehicleCarousel | null,
  compareVehicles?: IVehicle[] | IVehicleCarousel[] | null,
) => {
  if (!data || !compareVehicles) {
    return false;
  }

  if (
    compareVehicles.some(
      vehicle =>
        vehicle.vehicleType === VehicleTypeEnum.LCV &&
        vehicle.bodyStyle !== 'Pickup',
    ) &&
    data.vehicleType === VehicleTypeEnum.CAR
  ) {
    return false;
  }

  if (
    compareVehicles.some(
      vehicle => vehicle.vehicleType === VehicleTypeEnum.CAR,
    ) &&
    data.bodyStyle !== 'Pickup' &&
    data.vehicleType === VehicleTypeEnum.LCV
  ) {
    return false;
  }

  return true;
};

export const deleteCompare = async (vehicle: ICompareVehicle) => {
  const arrayCompares = (await localForage.getItem('compares')) as
    | IVehicle[]
    | IVehicleCarousel[]
    | null;
  // if compares already exist
  if (arrayCompares) {
    // delete vehicle from compare
    const deletedVehicle = arrayCompares.find(
      (compare: IVehicle | ICompareVehicle | IVehicleCarousel) =>
        `${compare.capId}` === `${vehicle?.capId}`,
    );
    if (deletedVehicle) {
      const index = arrayCompares.indexOf(deletedVehicle);
      if (index > -1) {
        arrayCompares.splice(index, 1);
      }
      await localForage.setItem('compares', arrayCompares);
    }
    return arrayCompares;
  }

  return [];
};

export const getCompares = () => {
  const compares = localForage.getItem('compares');
  return compares || [];
};

export const getVehiclesForComparator = (
  vehicles: IVehicle[] | IVehicleCarousel[],
): ICompareVehicle[] => {
  if (!vehicles) {
    return [
      {
        capId: '',
        derivativeName: '',
        manufacturerName: '',
        rangeName: '',
      },
    ];
  }
  return vehicles.map(vehicle => ({
    capId: vehicle.capId,
    derivativeName: vehicle.derivativeName,
    manufacturerName: vehicle.manufacturerName,
    rangeName: vehicle.rangeName,
  }));
};

export const isCompared = (
  compareVehicles: IVehicle[] | IVehicleCarousel[] | null | undefined,
  product: IVehicle | IVehicleCarousel | null | undefined,
) => {
  return compareVehicles?.some(
    vehicle => `${vehicle.capId}` === `${product?.capId}`,
  );
};
