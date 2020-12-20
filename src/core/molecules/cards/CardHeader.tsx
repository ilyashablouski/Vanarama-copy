import cx from 'classnames';
import React, { FC, memo } from 'react';

import { IBaseProps } from '../../interfaces/base';

interface ICardHeader {
  text: string;
  accentText?: string;
  accentIcon?: React.ReactNode;
}

export interface ICardHeaderProps extends IBaseProps, ICardHeader {
  complete?: boolean;
  incomplete?: boolean;
}

const CardHeader: FC<ICardHeaderProps> = memo(props => {
  const {
    className,
    complete,
    incomplete,
    text,
    accentIcon,
    accentText,
  } = props;
  return (
    <div
      className={cx('card-header', {
        [`${className}`]: className,
        '-success': complete,
        '-orange': incomplete,
      })}
    >
      <div>{text}</div>
      {(accentIcon || accentText) && (
        <div>
          {accentIcon ?? null}
          {accentText ?? null}
        </div>
      )}
    </div>
  );
});

export default CardHeader;
