export interface IRegisterFormProps {
  isSubmitting?: boolean;
  onSubmit: (values: IRegisterFormValues) => Promise<void>;
  onCheckEmailExists: (email: string) => Promise<boolean>;
}

export interface IRegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}
