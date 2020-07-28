import { GetInsuranceLandingPage_insuranceLandingPage_sections_hero_heroCard as WorkingHoursCard } from "../../../generated/GetInsuranceLandingPage";

export interface IHeroProps {
  flagText?: string;
  withRequestCallbackForm?: boolean;
  workingHoursCard?: WorkingHoursCard;
}

export interface IHeroTitleProps {
  text: string;
}

export interface IHeroHeadingProps {
  text: string;
  titleTag?: string;
}
