export interface ILoginFormValues {
  email: string;
  password: string;
}

export interface ILoginFormProps {
  hasError?: boolean;
  isSubmitting?: boolean;
  onSubmit: (values: ILoginFormValues) => Promise<void>;
}
