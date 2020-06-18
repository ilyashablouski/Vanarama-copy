export interface IResetPasswordFormValues {
  code: string;
  password: string;
  confirmPass: string;
}

export interface IResetPasswordRequestValues {
  code: string;
  password: string;
  username: string;
}

export interface IResetPasswordFormProps {
  hasError?: boolean;
  isSubmitting?: boolean;
  onSubmit: (values: IResetPasswordRequestValues) => Promise<void>;
  username?: string;
  code?: string;
  oldPassword?: boolean;
  onPasswordValidation?: (password: string) => Promise<boolean | undefined>;
}
