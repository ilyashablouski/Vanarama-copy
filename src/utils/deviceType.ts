import { isMobileOnly, isTablet } from 'react-device-detect';

export const DEVICE_TYPES = {
  desktop: 'Desktop',
  mobile: 'Mobile',
  tablet: 'Tablet',
};

export const isBrowser = () => {
  return typeof window !== 'undefined';
};
export const isServer = () => {
  return !isBrowser();
};

export const getDeviceType = () => {
  if (isTablet) {
    return DEVICE_TYPES.tablet;
  }
  if (isMobileOnly) {
    return DEVICE_TYPES.mobile;
  }
  return DEVICE_TYPES.desktop;
};

export const isServerRenderOrAppleDevice =
  isServer() || navigator?.vendor === 'Apple Computer, Inc.';

export const isChromeBrowser =
  isBrowser() && navigator?.userAgent?.indexOf('Chrome') !== -1;

export const isAndroid = isBrowser() && /(android)/i.test(navigator.userAgent);
