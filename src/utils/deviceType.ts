import { isMobileOnly, isTablet } from 'react-device-detect';

export const DEVICE_TYPES = {
  desctop: 'Desctop',
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
  return DEVICE_TYPES.desctop;
};
