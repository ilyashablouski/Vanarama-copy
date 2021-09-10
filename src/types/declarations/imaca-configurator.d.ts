class ResourceCache {
  constructor(maxEntries: number);
}

class ConfigurationRenderer {
  public wrapperElement: HTMLElement;

  constructor(
    container: HTMLElement | null,
    settings: {
      width: number;
      height: number;
      syncToLocationHref?: string[];
    },
    initialConfiguration: {
      color: string;
      tyres: string;
      rims: string;
      car: string;
    } | null,
    cache: ReturnType<ResourceCache>,
  );

  bindController: (controller: HTMLElement | null, name: string) => void;

  unbindController: () => void;

  setConfigAttribute: (name: string, value: string | null | undefined) => void;

  prewarmCache: () => void;

  start: () => void;

  stop: () => void;
}

interface Window {
  ResourceCache: typeof ResourceCache;
  ConfigurationRenderer: typeof ConfigurationRenderer;
  configurationRenderers: {
    [key: string]: ConfigurationRenderer;
  };
}
