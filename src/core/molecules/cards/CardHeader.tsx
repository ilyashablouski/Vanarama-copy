import cx from 'classnames';
import React, { FC, memo } from 'react';

import { IBaseProps } from '../../interfaces/base';

interface ICardHeader {
  text: string;
  accentText?: string;
  accentIcon?: React.ReactNode;
  accentStyles?: React.CSSProperties;
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
    accentStyles,
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
      <div style={accentStyles} data-uitestid={`${dataUiTestId}_availability`}>{text}</div>
      {(accentIcon || accentText) && (
        <div style={accentStyles}>
          {accentIcon ?? null}
          <span>{accentText ?? null}</span>
        </div>
      )}
    </div>
  );
});

export default CardHeader;
