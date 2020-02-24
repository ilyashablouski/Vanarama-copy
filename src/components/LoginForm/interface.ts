export interface Session {
    isAuthenticated: boolean;
    currentSessionData: any;
  }

export interface IProps {
    session: Session;
    updateSession: (isAuthenticated: boolean, currentSessionData: any) => boolean;
}
  
export interface IState {
    emailAddress: string;
    password: string;
    token: string;
    errors: object;
    success: boolean;
}