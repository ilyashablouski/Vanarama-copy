export interface Auth {
  token: string;
}

export interface AuthState {
  data: Auth;
  authenticated: boolean;
}

export interface RegisterState {
  success: boolean;
  error: string;
}
