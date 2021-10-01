import React, { useEffect, useRef } from 'react';

import { IImacaConfigurator } from './interfaces';

// colour should be specified as HEX code without # symbol
const DEFAULT_COLOUR = '000000';

function ImacaConfigurator({
  id,
  className,
  width,
  height,
  selectedColour,
  assets,
  onClick,
  onMouseDown,
  onTouchStart,
}: IImacaConfigurator) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // imaca-configurator is a client-side only library, so we need to include it this way
    // eslint-disable-next-line global-require
    require('../../../../lib/imaca-configurator');

    const resourceCache = new window.ResourceCache(64);
    const configViewer = new window.ConfigurationRenderer(
      containerRef.current,
      { width, height, syncToLocationHref: ['angle'] },
      {
        rims: assets.rimsUrl ?? '',
        tyres: assets.tyresUrl ?? '',
        car: assets.vehicleUrl ?? '',
        color: selectedColour ?? DEFAULT_COLOUR,
        plateFilterQuality: 1,
        angle: 50,
      },
      resourceCache,
    );

    configViewer.start();

    return () => {
      configViewer.stop();
      configViewer.wrapperElement.remove();
      delete window.configurationRenderers?.[id];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height, width, id]);

  useEffect(() => {
    const configViewer = window.configurationRenderers?.[id];

    if (configViewer && assets) {
      configViewer.setConfigAttribute('rims', assets.rimsUrl);
      configViewer.setConfigAttribute('tyres', assets.tyresUrl);
      configViewer.setConfigAttribute('car', assets.vehicleUrl);
      configViewer.prewarmCache();
    }
  }, [assets, id]);

  useEffect(() => {
    const configViewer = window.configurationRenderers?.[id];

    if (configViewer && selectedColour) {
      configViewer.setConfigAttribute('color', selectedColour);
      configViewer.prewarmCache();
    }
  }, [selectedColour, id]);

  return (
    <div
      id={id}
      className={className}
      role="presentation"
      ref={containerRef}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    />
  );
}

export default ImacaConfigurator;
