export interface IGoldrushFormProps {
  onSubmit: (values: IGoldrushFromValues) => void;
  isSubmitting?: boolean;
  isPostcodeVisible?: boolean;
  heading: string;
}

export interface IGoldrushFromValues {
  fullName: string;
  email: string;
  phoneNumber: string;
  postcode?: string;
  marketingPreference?: Boolean;
}
