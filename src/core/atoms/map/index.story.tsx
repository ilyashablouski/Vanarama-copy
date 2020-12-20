import { storiesOf } from '@storybook/react';
import base from 'paths.macro';
import React, { useState } from 'react';
import Map from '.';
import { atomicDir } from '../../../helpers/atomicDirUtils';

// NOTE: Uses an empty API key to run in development mode
const API_KEY = '';
const EXAMPLE_COORDS: google.maps.LatLngLiteral = {
  lat: 53.3333,
  lng: -3.08333,
};

storiesOf(`${atomicDir(base)}|Map`, module).add('Default', () => {
  const [show, setShow] = useState(false);
  return (
    <Map apiKey={API_KEY} center={EXAMPLE_COORDS} zoom={11}>
      {show && (
        <Map.InfoWindow
          onCloseClick={() => setShow(false)}
          position={EXAMPLE_COORDS}
        >
          <div>Some address here...</div>
        </Map.InfoWindow>
      )}
      <Map.Marker
        icon="http://m.schuepfen.ch/icons/helveticons/black/60/Pin-location.png"
        onClick={() => setShow(true)}
        position={EXAMPLE_COORDS}
        title="Image title"
      />
    </Map>
  );
});
