import cx from 'classnames';
import React, { FC, memo } from 'react';

import { IBaseProps } from '../../interfaces/base';
import { normalizeString } from '../../../utils/data';

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
      data-uitestid={dataUiTestId ? `${dataUiTestId}_header` : undefined}
    >
      <div style={accentStyles} data-uitestid={`${dataUiTestId}_availability`}>
        {text}
      </div>
      {(accentIcon || accentText) && (
        <div
          style={accentStyles}
          className={normalizeString(accentText)}
          data-uitestid={
            dataUiTestId
              ? `${dataUiTestId}_${normalizeString(accentText)}`
              : undefined
          }
        >
          {accentIcon ?? null}
          {accentText && <span>{accentText}</span>}
        </div>
      )}
    </div>
  );
});

export default CardHeader;
