import { VehicleTypeEnum } from '../../generated/globalTypes';
import { GetProductCard_productCard as ICard } from '../../generated/GetProductCard';
import { ProductCardData_productCarousel as ICardCarousel } from '../../generated/ProductCardData';
import createApolloClient from '../apolloClient';
import {
  getStoredItemsToCompare,
  saveItemsToCompare,
} from '../gql/storedItemToCompare';

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

export interface IProductPageUrl {
  url: string;
  href: string;
  capId: string;
}

const client = createApolloClient({});

export const changeCompares = async (
  vehicle: IVehicle | IVehicleCarousel | null,
  capId?: string | number,
) => {
  const arrayCompares = await getStoredItemsToCompare(client);

  // if compares already exist
  if ((arrayCompares && vehicle) || capId) {
    if (
      capId ||
      arrayCompares?.some(
        compare => `${compare?.capId}` === `${vehicle?.capId}`,
      )
    ) {
      // delete vehicle from compare
      const deletedVehicle = arrayCompares?.find(
        compare =>
          `${compare?.capId}` === `${vehicle?.capId}` ||
          `${compare?.capId}` === `${capId}`,
      );
      if (deletedVehicle) {
        const index = arrayCompares?.indexOf(deletedVehicle);
        if (index !== undefined && index > -1) {
          arrayCompares?.splice(index, 1);
        }
        await saveItemsToCompare(client, arrayCompares);
      }
      return arrayCompares;
    }

    if (arrayCompares && arrayCompares?.length < 3) {
      // add vehicle to compare
      await saveItemsToCompare(client, [...arrayCompares, vehicle]);

      return [...arrayCompares, vehicle];
    }
    return arrayCompares;
  }

  await saveItemsToCompare(client, vehicle ? [vehicle] : []);
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
  const arrayCompares = await getStoredItemsToCompare(client);

  // if compares already exist
  if (arrayCompares) {
    // delete vehicle from compare
    const deletedVehicle = arrayCompares.find(
      compare => `${compare?.capId}` === `${vehicle?.capId}`,
    );
    if (deletedVehicle) {
      const index = arrayCompares.indexOf(deletedVehicle);
      if (index > -1) {
        arrayCompares.splice(index, 1);
      }
      await saveItemsToCompare(client, arrayCompares);
    }
    return arrayCompares as IVehicle[] | IVehicleCarousel[];
  }

  return [];
};

export const getCompares = () => getStoredItemsToCompare(client);

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
