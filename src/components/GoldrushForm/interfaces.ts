export interface IGoldrushFormProps {
  onSubmit: (values: IGoldrushFromValues) => void;
  isSubmitting?: boolean;
  isPostcodeVisible?: boolean;
  isTextInVisible?: boolean;
  heading?: string;
  callBack?: boolean;
  text?: string;
  className?: string;
  termsAndConditionsId?: string;
  noTermsAndConditions?: boolean;
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
