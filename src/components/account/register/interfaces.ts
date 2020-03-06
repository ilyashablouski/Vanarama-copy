export interface IRegisterState {
  email: string,
  password: string,
  repeatPassword: string,
}
  
export interface IRegisterProps {
  register: (email: string, password: string) => void;
}
   