import React, { FC, memo } from 'react';
import cx from 'classnames';

import LogoBVRLA from 'core/assets/images/logo-bvrla';
import LogoVanaramaInline from 'core/assets/images/logo-vanarama-inline';

import { ILogoProps } from './interfaces';

const getLogo = (asset: string) => {
  switch (asset.toLowerCase()) {
    case 'bvrla':
      return <LogoBVRLA />;
    case 'vanarama':
    default:
      return <LogoVanaramaInline />;
  }
};

const Logo: FC<ILogoProps> = memo(({ className, dataUiTestId, assetName }) => (
  <span
    className={cx('logo', className)}
    data-uitestid={
      dataUiTestId ? `${dataUiTestId}_${assetName}-logo` : undefined
    }
  >
    {getLogo(assetName)}
  </span>
));

Logo.displayName = 'Logo';

export default Logo;
