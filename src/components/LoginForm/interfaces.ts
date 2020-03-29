export interface ILoginFormValues {
  email: string;
  password: string;
}

export interface ILoginFormProps {
  isSubmitting?: boolean;
  onSubmit: (values: ILoginFormValues) => Promise<void>;
}
