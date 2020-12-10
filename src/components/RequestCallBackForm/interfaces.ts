export interface IFleetCallBackFormProps {
  onSubmit: (values: IFleetCallBackFormValues) => void;
  setShowModal: (show: boolean) => void;
  isSubmitting?: boolean;
  showModal: boolean;
}

export interface IFleetCallBackFormValues {
  fullName: string;
  companyName: string;
  fleetSize: number;
  email: string;
  phoneNumber: string;
  agreement?: boolean;
  updates?: boolean;
}
