import React, { FC } from 'react';
import Price from '../../../atoms/price';
import Text from '../../../atoms/text';
import StructuredList from '../../../organisms/structured-list';
import { ICardProps } from '../interfaces';
import Card from '..';
import FreeInsuranceLabel from '../../../../components/FreeInsuranceLabel';
import {
  GetDerivative_vehicleDetails_roadsideAssistance,
  GetDerivative_vehicleDetails_warrantyDetails,
} from '../../../../../generated/GetDerivative';

export interface IOlafDetails {
  isFreeInsurance?: boolean | null;
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
  roadsideAssistance?: GetDerivative_vehicleDetails_roadsideAssistance | null;
  warrantyDetails?: GetDerivative_vehicleDetails_warrantyDetails | null;
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
    roadsideAssistance,
    warrantyDetails,
  } = props;
  const data = [
    {
      name: 'processingFee',
      label: 'Processing Fee',
      value: 'FREE',
      dataTestId: 'processingFee',
      isOrange: true,
    },
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
      value: `${olafDetails.annualMileage}**`,
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
    {
      name: 'warranty',
      label: 'Warranty',
      value: `${warrantyDetails?.years} Years Manufacturer Or ${warrantyDetails?.mileage} Miles`,
      dataTestId: 'warranty',
    },
    {
      name: 'roadTax',
      label: 'Road Tax',
      value: 'INCLUDED',
      dataTestId: 'roadTax',
      isOrange: true,
    },
    {
      name: 'delivery',
      label: 'Delivery',
      value: 'FREE',
      dataTestId: 'delivery',
      isOrange: true,
    },
    {
      name: 'roadsideAssistance',
      label: 'Roadside Assistance',
      value:
        roadsideAssistance?.years && roadsideAssistance?.years > 1
          ? `${roadsideAssistance?.years} YEARS INCLUDED`
          : `${roadsideAssistance?.years} YEAR INCLUDED`,
      dataTestId: 'roadsideAssistance',
      isOrange: true,
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
      {olafDetails.isFreeInsurance && <FreeInsuranceLabel />}
    </Card>
  );
};

export default React.memo(OlafCard);
