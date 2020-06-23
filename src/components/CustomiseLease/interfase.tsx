import { Dispatch, SetStateAction } from 'react';
import { GetQuoteDetails } from '../../../generated/GetQuoteDetails';
import { GetLeaseDetails } from '../../../generated/GetLeaseDetails';

export interface IChoice {
  label: string;
  active: boolean;
}

export interface ITrim {
  id: string;
  optionDescription: string;
}

export interface IColour {
  id: string;
  optionDescription: string;
}

export interface IProps {
  terms: IChoice[];
  upfronts: IChoice[];
  leaseTypes: IChoice[];
  mileages: string[] | undefined;
  setLeaseType: Dispatch<SetStateAction<string>>;
  setMileage: Dispatch<SetStateAction<number | null>>;
  setUpfront: Dispatch<SetStateAction<number | null>>;
  setColour: Dispatch<SetStateAction<number | null>>;
  setTerm: Dispatch<SetStateAction<number | null>>;
  setTrim: Dispatch<SetStateAction<number | null>>;
  quoteData: GetQuoteDetails;
  leaseType: string;
  data: GetLeaseDetails | undefined;
}
