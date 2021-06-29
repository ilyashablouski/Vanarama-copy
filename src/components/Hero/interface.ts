import React from 'react';
import { TColor } from 'types/color';
import { filterList as IFilterList } from '../../../generated/filterList';
import { GetInsuranceLandingPage_insuranceLandingPage_sections_hero_heroCard as WorkingHoursCard } from '../../../generated/GetInsuranceLandingPage';
import { VehicleTypeEnum } from '../../../generated/globalTypes';

export interface IHeroProps {
  flagText?: string;
  withRequestCallbackForm?: boolean;
  workingHoursCard?: WorkingHoursCard;
  searchPodVansData?: IFilterList;
  searchPodCarsData?: IFilterList;
  topHeader?: React.ReactNode;
  customCTAColor?: string;
  hideBenefitsBar?: boolean;
  hideCurve?: boolean;
  smallPrint?: string;
  customCTALink?: string;
  activeSearchIndex?: number;
  searchType?: VehicleTypeEnum;
}

export interface IHeroTitleProps {
  text: string;
}

export interface IHeroHeadingProps {
  text: string;
  titleTag?: string;
  color?: TColor;
}
