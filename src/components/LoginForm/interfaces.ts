export interface ILoginFormValues {
  email: string;
  password: string;
}

export interface ILoginFormProps {
  onSuccess: (token: string) => void;
}
