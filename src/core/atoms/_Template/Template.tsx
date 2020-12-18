import React, { FC, memo } from 'react';
import cx from 'classnames';

import { ITemplateProps } from './interfaces';

// @ts-ignore
import variables from './variables.scss';

const Template: FC<ITemplateProps> = memo(props => {
  const { className, dataTestId } = props;

  return (
    <p
      className={cx('template', {
        [`${className}`]: className,
      })}
      style={{ color: variables.orange }}
      data-testid={dataTestId}
    >
      Template
    </p>
  );
});

export default Template;
