import { TColor } from 'types/color';
import { GetInsuranceLandingPage_insuranceLandingPage_sections_hero_heroCard as WorkingHoursCard } from '../../../generated/GetInsuranceLandingPage';
import { filterList as IFilterList } from '../../../generated/filterList';
import React from 'react';

export interface IHeroProps {
  flagText?: string;
  withRequestCallbackForm?: boolean;
  workingHoursCard?: WorkingHoursCard;
  searchPodVansData?: IFilterList;
  searchPodCarsData?: IFilterList;
  topHeader?: React.ReactNode;
  customCTAColor?: string;
}

export interface IHeroTitleProps {
  text: string;
}

export interface IHeroHeadingProps {
  text: string;
  titleTag?: string;
  color?: TColor;
}
