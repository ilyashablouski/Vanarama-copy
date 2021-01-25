import React, { FC } from 'react';
import cx from 'classnames';

import { IInitialsProps } from './interfaces';
import getInitials from './helpers';

const Initials: FC<IInitialsProps> = props => {
  const { className, fullName } = props;

  if (!fullName.length) {
    return <></>;
  }

  // Get First and Last except get First 2 in case there is only first.
  const title = getInitials(fullName);

  return (
    <div
      className={cx('initials', {
        [`${className}`]: className,
      })}
    >
      {title}
    </div>
  );
};

Initials.displayName = 'Initials';

export default React.memo(Initials);
