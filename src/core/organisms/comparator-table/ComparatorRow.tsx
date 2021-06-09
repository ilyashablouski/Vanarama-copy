import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { IComparatorRow, IPrice } from './interface';
import Button from '../../atoms/button';
import Heading from '../../atoms/heading';
import Price from '../../atoms/price';

const ComparatorRow: React.FC<IComparatorRow> = ({
  compares,
  columns,
  priceValues,
  index,
  setIndex,
  viewOffer,
}) => {
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    if (!isSmallScreen) {
      setIndex(0);
    }
  }, [isSmallScreen, setIndex]);

  const onClickViewOffer = (number: number) => {
    if (priceValues && viewOffer) {
      const priceValue = priceValues[number] as IPrice;
      viewOffer(priceValue.capId);
    }
  };

  const getPrice = (number: number) => {
    if (!priceValues) {
      return 0;
    }
    const priceValue = priceValues[number] as IPrice;
    return priceValue.price;
  };

  const priceBlock = (number: number) => {
    return priceValues && priceValues[number] ? (
      <span key={`${getPrice(number)}price`} className="comparator-table--col">
        <Price
          size="xlarge"
          color="black"
          price={getPrice(number)}
          priceDescription="Per Month ex. VAT"
        />
        <Button
          color="teal"
          size="regular"
          fill="solid"
          onClick={() => {
            onClickViewOffer(number);
          }}
          label="View Offer"
        />
      </span>
    ) : (
      <span key={`empty${number}`} className="comparator-table--col">
        —
      </span>
    );
  };

  const comparableItem = (number: number) => {
    return (
      <span
        key={`${(compares?.title || '') + number}compares`}
        className="comparator-table--col"
      >
        {compares?.values[number] || '—'}
      </span>
    );
  };

  return (
    <>
      {compares?.title && (
        <Heading
          size="regular"
          color="black"
          className="comparator-table--row-title"
        >
          {compares?.title}
        </Heading>
      )}
      <div className="comparator-table--row">
        {!priceValues && compares ? (
          <>
            {(!isSmallScreen &&
              columns?.map((column, number) => comparableItem(number))) || (
              <>
                {comparableItem(index)}
                {comparableItem(index !== 2 ? index + 1 : 0)}
              </>
            )}
          </>
        ) : (
          <>
            {priceValues && !isSmallScreen ? (
              columns?.map((column, number) => priceBlock(number))
            ) : (
              <>
                {priceBlock(index)}
                {priceBlock(index !== 2 ? index + 1 : 0)}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ComparatorRow;
