import { TColor } from 'types/color';
import { GetInsuranceLandingPage_insuranceLandingPage_sections_hero_heroCard as WorkingHoursCard } from '../../../generated/GetInsuranceLandingPage';
import { filterList as IFilterList } from '../../../generated/filterList';

export interface ICompetitionHeroProps {
  flagText?: string;
  withRequestCallbackForm?: boolean;
  workingHoursCard?: WorkingHoursCard;
  searchPodVansData?: IFilterList;
  searchPodCarsData?: IFilterList;
}

export interface ICompetitionHeroTitleProps {
  text: string;
}

export interface ICompetitionHeroHeadingProps {
  text: string;
  titleTag?: string;
  color?: TColor;
}
