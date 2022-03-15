import React from 'react';

import { TColor } from 'types/color';
import { IBaseProps } from 'core/interfaces/base';

import { filterList as IFilterList } from '../../../generated/filterList';
import { GetInsuranceLandingPage_insuranceLandingPage_sections_hero_heroCard as WorkingHoursCard } from '../../../generated/GetInsuranceLandingPage';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import { Nullable } from '../../types/common';

export interface IHeroProps extends IBaseProps {
  flagText?: string;
  backgroundUrl?: string;
  withRequestCallbackForm?: boolean;
  workingHoursCard?: WorkingHoursCard;
  searchPodVansData?: IFilterList;
  searchPodCarsData?: IFilterList;
  topHeader?: React.ReactNode;
  customCTAColor?: string;
  hideCurve?: boolean;
  smallPrint?: string;
  customCTALink?: string;
  activeSearchIndex?: number;
  searchType?: VehicleTypeEnum;
  expand?: boolean;
  terms?: string | null;
  isCustomSearchButtonLabel?: boolean;
  dataUiTestId?: string;
  isCurve?: boolean;
}

export interface IHeroTitleProps extends IBaseProps {
  text: string;
}

export interface IHeroHeadingProps extends IBaseProps {
  text: string;
  titleTag?: string;
  color?: TColor;
}

export interface IHeroPromptProps extends IBaseProps {
  btnVisible?: Nullable<boolean>;
  text: string;
  label: string;
  url: string;
}
