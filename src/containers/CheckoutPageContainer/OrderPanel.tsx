import React, { useMemo } from 'react';
import Text from 'core/atoms/text';
import List from 'core/atoms/list';
import Heading from 'core/atoms/heading';

import { OrderPanelProps } from './interfaces';
import {
  LeaseTypeEnum,
  VehicleProductInputObject,
} from '../../../generated/globalTypes';

const generateListItems = (
  vehicleProduct?: VehicleProductInputObject | null,
) => [
  {
    label: 'Contract Type:',
    description: undefined,
  },
  {
    label: 'Contract Length:',
    description: `${vehicleProduct?.depositMonths} Months`,
  },
  {
    label: 'Annual Mileage:',
    description: vehicleProduct?.annualMileage ? 'Yes' : 'No',
  },
  {
    label: 'Colour:',
    description: vehicleProduct?.colour,
  },
  {
    label: 'Trim / Interior:',
    description: vehicleProduct?.trim,
  },
  {
    label: 'Stock:',
    description: vehicleProduct?.leadTime,
  },
];

const OrderPanel: React.FC<OrderPanelProps> = ({
  order,
  vehicleImage,
  vehicleConfiguration,
}) => {
  const vehicleProduct = useMemo(() => order?.lineItems?.[0]?.vehicleProduct, [
    order,
  ]);
  const listItems = useMemo(() => generateListItems(vehicleProduct), [
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
          <List className="breakdown-list -m-000" style={{ gap: '6px' }}>
            <li className="-custom -mb-000">
              <Text tag="span">Initial Payment:</Text>
              {`£${vehicleProduct?.depositPayment} ${
                isPersonalPrice ? 'Inc' : 'Exc'
              } Vat`}
            </li>
            {listItems.map(item => (
              <li className="-custom -mb-000" key={item.label}>
                <Text tag="span">{item.label}</Text>
                {item.description}
              </li>
            ))}
          </List>
          <Text className="breakdown-terms" tag="p">
            * After We&lsquo;ve Received Your E-Signed Documents
          </Text>
        </div>
      </div>
    </div>
  );
};

export default OrderPanel;
