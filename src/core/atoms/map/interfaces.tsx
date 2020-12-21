import { GoogleMapProps, InfoWindow, Marker } from '@react-google-maps/api';
import { IBaseProps } from '../../interfaces/base';

export interface IMapProps extends IBaseProps, GoogleMapProps {
  apiKey: string;
}

export type MapComponent = React.FC<IMapProps> & {
  InfoWindow: typeof InfoWindow;
  Marker: typeof Marker;
};
