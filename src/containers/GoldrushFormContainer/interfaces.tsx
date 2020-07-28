import { OpportunityTypeEnum } from '../../../generated/globalTypes';

export interface GoldrushFormContainerProps {
  onCompleted?: () => void;
  isPostcodeVisible?: boolean;
  capId?: number;
  opportunityType: OpportunityTypeEnum;
  termsAndConditions?: boolean;
  vehicleType?: string;
  callBack?: boolean;
}
