export interface IPasswordChangeContainerProps {
  uuid: string;
  onCompleted?: () => void;
  onNetworkError?: (error: Error) => void;
}
