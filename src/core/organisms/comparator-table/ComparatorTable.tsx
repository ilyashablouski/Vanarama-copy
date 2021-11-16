import React, { useState } from 'react';
import SwiperClass from 'swiper/types/swiper-class';
import { SwiperSlide } from 'swiper/react';
import cx from 'classnames';

import CarouselSwiper from 'core/organisms/carousel/CarouselSwiper';

import {
  IComparatorTable,
  IHeading,
  ICriterias,
  IVehicleDetails,
} from './interface';
import ComparatorCard from './ComparatorCard';
import ComparatorRow from './ComparatorRow';

const MAX_AMOUNT_VEHICLES = 3;

const ComparatorTable: React.FC<IComparatorTable> = ({
  className,
  dataTestId,
  deleteVehicle,
  criterias,
  addVehicle,
  viewOffer,
  leaseType,
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

  function handleSlideChange(swiper: SwiperClass) {
    setIndex(swiper.realIndex);
  }

  return (
    <div className={cx('comparator-table', className)} data-testid={dataTestId}>
      <header className={cx('comparator-table--header', className)}>
        <CarouselSwiper
          watchOverflow
          countItems={3}
          className="comparator-table--slider"
          onSlideChange={handleSlideChange}
        >
          {columns.map((column, number) => (
            <SwiperSlide key={number.toString()}>
              <ComparatorCard
                deleteVehicle={() => {
                  const headingValue = headingValues?.values[
                    number
                  ] as IHeading;
                  deleteVehicle(headingValue.capId);
                }}
                addVehicle={() => addVehicle()}
                headingValue={headingValues?.values[number] as IHeading}
                number={number + 1}
              />
            </SwiperSlide>
          ))}
        </CarouselSwiper>
      </header>
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
              leaseType={leaseType}
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
          leaseType={leaseType}
        />
      )}
    </div>
  );
};

export default ComparatorTable;
