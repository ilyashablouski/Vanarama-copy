import React, { FC } from 'react';
import Price from '../../../atoms/price';
import Text from '../../../atoms/text';
import StructuredList from '../../../organisms/structured-list';
import { ICardProps } from '../interfaces';
import Card from '..';

export interface IOlafDetails {
  price: number;
  priceDescription: string;
  description: string;
  initailRental: string;
  contractLength: string;
  annualMileage: string;
  maintenance: string;
  fuel: string;
  transmission: string;
  color: string;
  trim: string;
  initialRentalDataTestId?: string;
  controlLengthDataTestId?: string;
  annualMileageDataTestId?: string;
  annualMileageBoosterDataTestId?: string;
  damageCoverDataTestId?: string;
  maintenanceDataTestId?: string;
  fuelDataTestId?: string;
  transmissionDataTestId?: string;
  colorDataTestId?: string;
  trimDataTestId?: string;
  descriptionDataTestId?: string;
}

export interface IOlafCardProps extends ICardProps {
  olafDetails: IOlafDetails;
}

const OlafCard: FC<IOlafCardProps> = props => {
  const {
    olafDetails,
    initialRentalDataTestId,
    controlLengthDataTestId,
    annualMileageDataTestId,
    maintenanceDataTestId,
    fuelDataTestId,
    transmissionDataTestId,
    colorDataTestId,
    trimDataTestId,
    descriptionDataTestId,
  } = props;
  const data = [
    {
      name: 'rental',
      label: 'Initial Rental',
      value: olafDetails.initailRental,
      dataTestId: initialRentalDataTestId,
    },
    {
      name: 'contractLength',
      label: 'Contract Length',
      value: olafDetails.contractLength,
      dataTestId: controlLengthDataTestId,
    },
    {
      name: 'annualMileage',
      label: 'Annual Mileage',
      value: olafDetails.annualMileage,
      dataTestId: annualMileageDataTestId,
    },
    {
      name: 'maintenance',
      label: 'Maintenance',
      value: olafDetails.maintenance,
      dataTestId: maintenanceDataTestId,
    },
    {
      name: 'fuel',
      label: 'Fuel',
      value: olafDetails.fuel,
      dataTestId: fuelDataTestId,
    },
    {
      name: 'transmission',
      label: 'Transmission',
      value: olafDetails.transmission,
      dataTestId: transmissionDataTestId,
    },
    {
      name: 'color',
      label: 'Colour',
      value: olafDetails.color,
      dataTestId: colorDataTestId,
    },
    {
      name: 'trim',
      label: 'Trim',
      value: olafDetails.trim,
      dataTestId: trimDataTestId,
    },
  ];

  return (
    <Card {...props}>
      <div className="price-expanded">
        <Price
          price={olafDetails.price}
          size="xlarge"
          separator="."
          priceDescription={olafDetails.priceDescription || 'Per Month Exc.VAT'}
          dataTestId={initialRentalDataTestId}
        />
        <Text
          color="dark"
          size="small"
          tag="span"
          dataTestId={descriptionDataTestId}
        >
          {olafDetails.description}
        </Text>
      </div>
      <StructuredList dataTestId="order-details" list={data} />
    </Card>
  );
};

export default OlafCard;
