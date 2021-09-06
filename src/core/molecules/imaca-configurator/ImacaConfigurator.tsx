import React, { useEffect, useRef } from 'react';

import { IImacaConfigurator } from './interfaces';

function ImacaConfigurator({
  id,
  className,
  width,
  height,
  assets,
  onClick,
  onMouseDown,
}: IImacaConfigurator) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line global-require
    require('../../../../lib/imaca-configurator');

    const resourceCache = new window.ResourceCache(64);
    const configViewer = new window.ConfigurationRenderer(
      containerRef.current,
      { width, height, syncToLocationHref: [] },
      null,
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

    if (!configViewer) {
      return;
    }

    configViewer.setConfigAttribute('rims', assets.rimsUrl);
    configViewer.setConfigAttribute('tyres', assets.tyresUrl);
    configViewer.setConfigAttribute('car', assets.vehicleUrl);
    configViewer.setConfigAttribute('color', assets.colors[0]?.hex);
    configViewer.prewarmCache();
  }, [assets, id]);

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
