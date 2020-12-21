import React, { FC, memo } from 'react';
import cx from 'classnames';

import { ILogoProps } from './interfaces';

import LogoVanaramaInline from '../../assets/images/logo-vanarama-inline';
import LogoBVRLA from '../../assets/images/logo-bvrla';

const getLogo = (asset: string) => {
  switch (asset.toLowerCase()) {
    case 'bvrla':
      return <LogoBVRLA />;
    case 'vanarama':
    default:
      return <LogoVanaramaInline />;
  }
};

const Logo: FC<ILogoProps> = memo(props => {
  const { className, asset } = props;
  return <span className={cx('logo', className)}>{getLogo(asset)}</span>;
});

Logo.displayName = 'Logo';

export default Logo;
