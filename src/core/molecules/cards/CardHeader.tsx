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
    dataUiTestId,
  } = props;
  return (
    <div
      className={cx('card-header', {
        [`${className}`]: className,
        '-success': complete,
        '-orange': incomplete,
      })}
    >
      <div data-uitestid={`${dataUiTestId}_availability`}>{text}</div>
      {(accentIcon || accentText) && (
        <div>
          {accentIcon ?? null}
          <span>{accentText ?? null}</span>
        </div>
      )}
    </div>
  );
});

export default CardHeader;
