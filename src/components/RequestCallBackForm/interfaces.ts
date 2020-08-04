export interface IFleetCallBackFormProps {
  onSubmit: (values: IFleetCallBackFormValues) => void;
  isSubmitting?: boolean;
}

export interface IFleetCallBackFormValues {
  fullName: string;
  companyName: string;
  fleetSize: number;
  email: string;
  phoneNumber: string;
  agreement?: boolean;
}
