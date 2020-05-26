export interface IRequestPasswordFormValues {
  email: string;
}

export interface IRequestPasswordFormProps {
  hasError?: boolean;
  isSubmitting?: boolean;
  onSubmit: (values: IRequestPasswordFormValues) => Promise<void>;
}
