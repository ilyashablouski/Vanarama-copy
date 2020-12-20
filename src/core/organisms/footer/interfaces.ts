import { IBaseProps } from '../../interfaces/base';
import { ILink } from '../../interfaces/link';

export interface IFooterProps extends IBaseProps {
  emailAddress?: string;
  phoneNumber?: string;
  openingTimes?: IOpeningTimes[];
  headingZero?: string;
  headingOne?: string;
  headingTwo?: string;
  headingThree?: string;
  linkGroupOne?: ILink[];
  linkGroupTwo?: ILink[];
  linkGroupThree?: ILink[];
  legalText?: string;
}

export interface IOpeningTimes {
  day: string;
  time: string;
}
