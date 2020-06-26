export interface IGoldrushFormProps {
  onSubmit: (values: IGoldrushFromValues) => void;
  isSubmitting: boolean;
  isPostcodeVisible: boolean;
}

export interface IGoldrushFromValues {
  fullName: string;
  email: string;
  phoneNumber: string;
  postcode?: string;
}
