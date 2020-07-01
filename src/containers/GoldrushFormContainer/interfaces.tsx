export interface GoldrushFormContainerProps {
  onCompleted?: () => void;
  isPostcodeVisible?: boolean;
  capId?: number;
  kind: string;
  termsAndConditions?: boolean;
  vehicleType?: string;
}
