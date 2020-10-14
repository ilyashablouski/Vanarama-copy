export interface IEnabledCamera {
  onCloseModal: () => void;
}

export interface IAccessCamera {
  onClickYes: () => void;
  onClickNo: () => void;
}

export interface ICamera {
  webcamRef: React.RefObject<any>;
  handleOnUserMedia: () => void;
  onClickCapture: () => void;
}

export interface IPhotoPreview {
  imgSrc: string;
  onClickSave: () => void;
  onClickRetake: () => void;
}
