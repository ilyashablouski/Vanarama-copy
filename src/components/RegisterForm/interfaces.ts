export interface IRegisterFormProps {
  isSubmitting?: boolean;
  onSubmit: (values: IRegisterFormValues) => Promise<void>;
}

export interface IRegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}
