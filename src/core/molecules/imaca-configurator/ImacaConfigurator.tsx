import React, { useEffect, useRef } from 'react';

import { IImacaConfigurator } from './interfaces';

function ImacaConfigurator({
  id,
  className,
  width,
  height,
  selectedColour,
  assets,
  onClick,
  onMouseDown,
}: IImacaConfigurator) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // imaca-configurator is a client-side only library, so we need to include it this way
    // eslint-disable-next-line global-require
    require('../../../../lib/imaca-configurator');

    const resourceCache = new window.ResourceCache(64);
    const configViewer = new window.ConfigurationRenderer(
      containerRef.current,
      { width, height, syncToLocationHref: [] },
      {
        rims: assets.rimsUrl ?? '',
        tyres: assets.tyresUrl ?? '',
        car: assets.vehicleUrl ?? '',
      },
      resourceCache,
    );

    configViewer.start();

    return () => {
      configViewer.stop();
      configViewer.wrapperElement.remove();
      delete window.configurationRenderers[id];
    };
  }, [height, width, id]);

  useEffect(() => {
    const configViewer = window.configurationRenderers[id];

    if (configViewer && assets) {
      configViewer.setConfigAttribute('rims', assets.rimsUrl);
      configViewer.setConfigAttribute('tyres', assets.tyresUrl);
      configViewer.setConfigAttribute('car', assets.vehicleUrl);
      configViewer.prewarmCache();
    }
  }, [assets, id]);

  useEffect(() => {
    const configViewer = window.configurationRenderers[id];

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
    />
  );
}

export default ImacaConfigurator;
