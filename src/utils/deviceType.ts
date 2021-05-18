import { isMobileOnly, isTablet } from 'react-device-detect';

export const DEVICE_TYPES = {
  desktop: 'Desktop',
  mobile: 'Mobile',
  tablet: 'Tablet',
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
  typeof window === 'undefined' || navigator?.vendor === 'Apple Computer, Inc.';
