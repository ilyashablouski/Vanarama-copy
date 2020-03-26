export interface IRegisterFormProps {
  onSuccess: () => void;
}

export interface IRegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}
