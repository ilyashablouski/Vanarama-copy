import React from 'react';
import { render } from '@testing-library/react';
import Button from '../../../atoms/button';
import OrderCard from '../OrderCard/OrderCard';

describe('<OrderCard />', () => {
  it('should render correctly', () => {
    // ACT
    const wrapper = render(
      <OrderCard
        orderDetails={{
          price: 209,
          priceDescription: 'Per Month ex. VAT',
          available: 'now',
          initailRental: '£815.70 (inc VAT)',
          contractLength: '60 months',
          annualMileage: '6000 miles',
          maintenance: 'No',
          fuel: 'Petrol',
          transmission: 'Manual',
          color: 'Solid - Polar white',
          trim: 'Cloth - Black',
          orderNumber: '204334-44-44',
          orderDate: '12.12.2020',
          orderButton: (
            <Button
              color="teal"
              fill="solid"
              label="View Order"
              onClick={() => {}}
              size="regular"
            />
          ),
        }}
      />,
    );

    // ASSERT
    expect(wrapper.container).toMatchSnapshot();
  });
});
