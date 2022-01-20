import cx from 'classnames';
import React, { FC, memo } from 'react';
import { IPriceProps } from './interfaces';

const getPounds = (price: number) => Math.trunc(price);
const getPence = (price: number) => price.toFixed(2).split('.')[1];

const Price: FC<IPriceProps> = memo(props => {
  const {
    className,
    color = 'black',
    dataTestId,
    price,
    separator = '.',
    size = 'regular',
    hidePence,
    priceLabel,
    priceDescription,
    dataUitestId,
  } = props;

  return (
    <div
      className={cx('price', className, `-${size}`, `-${color}`)}
      data-testid={dataTestId}
    >
      {price ? (
        <>
          {priceLabel && <div className="price--label">{priceLabel}</div>}
          <div
            className="price--inner"
            data-uitestid={
              dataUitestId ? `${dataUitestId}_price-inner` : undefined
            }
          >
            <span className="price--sub">£</span>
            <span
              className="price--pounds"
              data-uitestid={
                dataUitestId ? `${dataUitestId}_span_pounds` : undefined
              }
            >
              {getPounds(price)}
            </span>
            {!hidePence && (
              <span
                className="price--sub"
                data-uitestid={
                  dataUitestId ? `${dataUitestId}_span_sub` : undefined
                }
              >
                {separator}
                {getPence(price)}
              </span>
            )}
          </div>
          {priceDescription && (
            <div className="price--label">{priceDescription}</div>
          )}
        </>
      ) : (
        <div
          className="price--inner"
          data-uitestid={
            dataUitestId ? `${dataUitestId}_price-inner` : undefined
          }
        >
          <span className="price--sub">£</span>
          <span className="price--pounds">POA</span>
        </div>
      )}
    </div>
  );
});

Price.displayName = 'Price';

export default Price;
