import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import cx from 'classnames';
import React from 'react';
import useScript from '../../../hooks/useScript';
import { MapComponent } from './interfaces';
import { GOOGLE_MAPS_API_URL } from '../../../helpers/constants';

const Map: MapComponent = ({
  apiKey,
  children,
  className,
  dataTestId,
  ...rest
}) => {
  const [loaded, error] = useScript(GOOGLE_MAPS_API_URL(apiKey));
  return (
    <div className={cx('map', className)} data-testid={dataTestId}>
      <div className="map--container" />
      {loaded && !error && (
        <GoogleMap {...rest} mapContainerClassName="map--native">
          {children}
        </GoogleMap>
      )}
    </div>
  );
};

Map.InfoWindow = InfoWindow;
Map.Marker = Marker;

export default Map;
