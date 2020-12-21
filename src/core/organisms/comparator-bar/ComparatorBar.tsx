import React from 'react';
import cx from 'classnames';
import { IComparatorBar } from './interface';
import ComporatorBarCard from './ComparatorBarCard';
import Heading from '../../atoms/heading/Heading';
import Button from '../../atoms/button';

const MAX_AMOUNT_VEHICLES = 3;

const ComporatorBar: React.FC<IComparatorBar> = ({
  className,
  dataTestId,
  deleteVehicle,
  compareVehicles,
  vehicles,
}) => {
  const arrayCards = Array(MAX_AMOUNT_VEHICLES).fill('');

  const vehiclesAdded =
    vehicles.length === 1
      ? `1 Vehicle Added`
      : `${vehicles.length} Vehicles Added`;

  return (
    <div className={cx('comparator-bar', className)} data-testid={dataTestId}>
      <div className="comparator-bar--container">
        {arrayCards.map((card, index) => (
          <ComporatorBarCard
            deleteVehicle={() => {
              deleteVehicle(vehicles[index]);
            }}
            key={`${(vehicles[index]?.capId || '') + index}`}
            vehicle={vehicles[index]}
            number={index + 1}
          />
        ))}
        <div className="comparator-bar--actions">
          <Heading
            size="xsmall"
            color="black"
            className="comparator-bar--actions-count"
          >
            {vehiclesAdded}
          </Heading>
          {vehicles.length === MAX_AMOUNT_VEHICLES && (
            <Heading
              size="xsmall"
              color="black"
              className="comparator-bar--actions-max"
            >
              {`${MAX_AMOUNT_VEHICLES} Vehicles Max`}
            </Heading>
          )}
          <Button
            onClick={() => {
              compareVehicles();
            }}
            disabled={vehicles.length < 2}
            size="lead"
            color="teal"
            label="Compare Vehicles"
          />
        </div>
      </div>
    </div>
  );
};

export default ComporatorBar;
