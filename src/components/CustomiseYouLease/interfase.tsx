import { Dispatch, SetStateAction } from 'react';
import { GetLeaseDetails } from '../../../generated/GetLeaseDetails';
import { GetQuoteDetails } from '../../../generated/GetQuoteDetails';

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
  data: GetLeaseDetails | undefined;
}
