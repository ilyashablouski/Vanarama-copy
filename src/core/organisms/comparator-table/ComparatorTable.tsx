import React, { useState } from 'react';
import cx from 'classnames';
import {
  IComparatorTable,
  IHeading,
  ICriterias,
  IVehicleDetails,
} from './interface';
import Carousel from './ComparatorCarousel';
import ComparatorCard from './ComparatorCard';
import ComparatorRow from './ComparatorRow';

const MAX_AMOUNT_VEHICLES = 3;

const ComporatorTable: React.FC<IComparatorTable> = ({
  className,
  dataTestId,
  deleteVehicle,
  criterias,
  addVehicle,
  viewOffer,
  isNotEmptyPage,
}) => {
  const [index, setIndex] = useState(0);
  const columns = Array(MAX_AMOUNT_VEHICLES).fill('');

  const vehiclesDetailsValues = criterias.reduce(
    (details, criteria: ICriterias) => {
      if (criteria.title === 'Heading') {
        return { headingValues: criteria, priceValues: details.priceValues };
      }
      if (criteria.title === 'Price') {
        return { headingValues: details.headingValues, priceValues: criteria };
      }

      return details;
    },
    {} as IVehicleDetails,
  );

  const { headingValues, priceValues } = vehiclesDetailsValues;

  return (
    <div className={cx('comparator-table', className)} data-testid={dataTestId}>
      <Carousel countItems={3} index={index} setIndex={setIndex}>
        {columns.map((column, number) => (
          <ComparatorCard
            key={`${(headingValues?.title || '') + number}`}
            deleteVehicle={() => {
              const headingValue = headingValues?.values[number] as IHeading;
              deleteVehicle(headingValue.capId);
            }}
            addVehicle={() => addVehicle()}
            headingValue={headingValues?.values[number] as IHeading}
            number={number + 1}
          />
        ))}
      </Carousel>
      {criterias.map(
        (criteria, number) =>
          criteria.title !== 'Heading' &&
          criteria.title !== 'Price' && (
            <ComparatorRow
              key={`${criteria.title + number}`}
              setIndex={setIndex}
              columns={columns}
              index={index}
              compares={criteria}
            />
          ),
      )}
      {isNotEmptyPage && (
        <ComparatorRow
          index={index}
          setIndex={setIndex}
          columns={columns}
          priceValues={priceValues?.values}
          viewOffer={capId => viewOffer && viewOffer(capId)}
        />
      )}
    </div>
  );
};

export default ComporatorTable;
