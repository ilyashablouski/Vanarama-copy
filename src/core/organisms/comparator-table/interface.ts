import { IBaseProps } from '../../interfaces/base';

export interface IHeading {
  capId: string | number;
  name: string;
  description: string;
  image: string;
}

export interface IPrice {
  capId: string | number;
  price: number;
}

export interface ICriterias {
  title: string;
  values: (string | number | IHeading | IPrice)[];
  capId?: (string | number)[];
}

export interface IComparatorTable extends IBaseProps {
  deleteVehicle: (capId: string | number) => void;
  criterias: ICriterias[];
  addVehicle: () => void;
  viewOffer?: (capId: string | number) => void;
}

export interface IVehicle {
  capId: string | null;
  derivativeName: string | null;
  manufacturerName: string | null;
  rangeName: string | null;
}

export interface IComparatorCard extends IBaseProps {
  deleteVehicle: () => void;
  addVehicle: () => void;
  number: number;
  headingValue: IHeading | undefined;
}

export interface IComparatorRow extends IBaseProps {
  index: number;
  columns?: undefined[];
  priceValues?: (string | number | IHeading | IPrice)[];
  compares?: ICriterias | undefined;
  viewOffer?: (capId: string | number) => void;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}

export interface IVehicleDetails {
  headingValues?: ICriterias;
  priceValues?: ICriterias;
}

export interface IComparatorCaruselProps extends IBaseProps {
  countItems: number;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}
