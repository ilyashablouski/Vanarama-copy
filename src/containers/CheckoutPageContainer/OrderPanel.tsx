import React, { useMemo } from 'react';
import Text from 'core/atoms/text';
import List from 'core/atoms/list';
import Heading from 'core/atoms/heading';

import { OrderPanelProps } from './interfaces';
import {
  LeaseTypeEnum,
  VehicleProductInputObject,
} from '../../../generated/globalTypes';
import { GetQuoteDetails } from '../../../generated/GetQuoteDetails';

const generateListItems = (
  quote: GetQuoteDetails['quoteByCapId'],
  vehicleProduct?: VehicleProductInputObject | null,
) => [
  {
    label: 'Contract Type: ',
    description:
      quote?.leaseType === LeaseTypeEnum.PERSONAL
        ? 'Personal Contract'
        : 'Contract Hire',
  },
  {
    label: 'Contract Length: ',
    description: `${quote?.term} Months`,
  },
  {
    label: 'Annual Mileage: ',
    description: `${quote?.mileage} Miles`,
  },
  {
    label: 'Colour: ',
    description: vehicleProduct?.colour || '-',
  },
  {
    label: 'Trim / Interior: ',
    description: vehicleProduct?.trim || '-',
  },
  {
    label: 'Stock: ',
    description: quote?.leadTime,
  },
];

const OrderPanel: React.FC<OrderPanelProps> = ({
  quote,
  order,
  vehicleImage,
  vehicleConfiguration,
}) => {
  const vehicleProduct = useMemo(() => order?.lineItems?.[0]?.vehicleProduct, [
    order,
  ]);
  const listItems = useMemo(() => generateListItems(quote, vehicleProduct), [
    quote,
    vehicleProduct,
  ]);
  const isPersonalPrice = order?.leaseType === LeaseTypeEnum.PERSONAL;
  const pageTitle = `${vehicleConfiguration?.capManufacturerDescription} ${vehicleConfiguration?.capModelDescription}`;

  return (
    <div className="panel">
      <div className="-copy-60-percent">
        <Heading className="-checkout" size="large" color="black" tag="h2">
          {pageTitle}
        </Heading>
        <div>
          <div className="cropped -aspect-4-3 -curved">
            <img alt="Vehicle preview" src={vehicleImage?.mainImageUrl || ''} />
          </div>
        </div>
        <div className="copy">
          <List className="breakdown-list" style={{ gap: 0 }}>
            <li className="-custom">
              <Text tag="span">Initial Payment: </Text>
              {`£${vehicleProduct?.depositPayment} ${
                isPersonalPrice ? 'inc.' : 'exc.'
              } VAT`}
            </li>
            {listItems.map(item => (
              <li className="-custom" key={item.label}>
                <Text tag="span">{item.label}</Text>
                {item.description}
              </li>
            ))}
          </List>
          <Text className="breakdown-terms" tag="p" color="black">
            * After We&lsquo;ve Received Your E-Signed Documents
          </Text>
        </div>
      </div>
    </div>
  );
};

export default OrderPanel;
