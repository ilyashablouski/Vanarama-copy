export interface LoginState {
  email: string,
  password: string,
  token: string,
}
  
export interface LoginProps {
  authenticated: boolean,
  token: string,
  login: (email: string, password: string) => void;
}
   