export interface IGoldrushFormProps {
  onSubmit: (values: IGoldrushFromValues) => void;
  isSubmitting?: boolean;
  isPostcodeVisible?: boolean;
  isTextInVisible?: boolean;
  heading?: string;
  isCallBackForm?: boolean;
  text?: string;
  className?: string;
  termsAndConditionsId?: string;
  noTermsAndConditions?: boolean;
  isPlaceholdersShown?: IPlaceholders;
  isLabelsShown?: ILabels;
  dataUiTestId?: string;
}

export interface IGoldrushFromValues {
  fullName: string;
  email: string;
  phoneNumber: string;
  postcode?: string;
  termsAndCons: boolean;
  privacyPolicy: boolean;
  consent: boolean;
}

interface IPlaceholders {
  fullName: boolean;
  email: boolean;
  phoneNumber: boolean;
  postcode?: boolean;
}

interface ILabels extends IPlaceholders {}
