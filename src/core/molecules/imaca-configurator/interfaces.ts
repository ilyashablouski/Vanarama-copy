export interface IColor {
  names?: string;
  hex: string;
}

export interface IImacaConfigurator {
  id: string;
  className?: string;
  width: number;
  height: number;
  onClick?: () => void;
  onMouseDown?: () => void;
  assets: {
    colors: IColor[];
    vehicleUrl: string;
    rimsUrl: string;
    tyresUrl: string;
  };
}
