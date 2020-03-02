export interface Auth {
    token: string;
}

export interface AuthState {
    data: Auth;
    authenticated: boolean;
}
  