import React from 'react';
import { mount } from 'enzyme';
import { fireEvent, render, screen } from '@testing-library/react';

import ComparatorTable from '../ComparatorTable';

const criterias = [
  {
    title: 'Manufacturer OTR',
    values: ['2', '2'],
  },
  {
    title: 'WLTP Combined',
    values: ['2', '2'],
  },
  {
    title: 'Fuel Type',
    values: ['2', '2'],
  },
  {
    title: '0 to 60 mph (secs)',
    values: ['2', '2'],
  },
  {
    title: 'CC',
    values: ['2', '2'],
  },
  {
    title: 'Engine Power - BHP',
    values: ['2', '2'],
  },
  {
    title: 'Insurance Group',
    values: ['2', '2'],
  },
  {
    title: 'No. of Seats',
    values: ['2', '2'],
  },
  {
    title: 'Top Speed',
    values: ['2', '2'],
  },
  {
    title: 'Transmission',
    values: ['2', '2'],
  },
  {
    title: 'Price',
    values: [
      {
        capId: 1,
        price: 56.73,
      },
      {
        capId: 2,
        price: 55.44,
      },
    ],
  },
  {
    title: 'Heading',
    values: [
      {
        capId: 1,
        name: 'Peugeot 208',
        description: '1.6 GDi SE Nav 5DR 2WD',
        image:
          'https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538982/cars/AudiQ70719_2_kk0b0n.jpg',
      },
      {
        capId: 2,
        name: 'Peugeot 208',
        description: '1.6 GDi SE Nav 5DR 2WD',
        image:
          'https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538982/cars/AudiQ70719_2_kk0b0n.jpg',
      },
    ],
  },
];

const mockAddVehicles = jest.fn();
const mockDeleteVehicle = jest.fn();
const mockViewOffer = jest.fn();

describe('<ComparatorTable />', () => {
  it('renders correctly with default <ComparatorTable />', () => {
    const wrapper = mount(
      <ComparatorTable
        addVehicle={mockAddVehicles}
        deleteVehicle={mockDeleteVehicle}
        criterias={criterias}
        viewOffer={mockViewOffer}
        isNotEmptyPage
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('button add, delete, view vehicle correctly with default <ComparatorRow />', () => {
    render(
      <ComparatorTable
        addVehicle={mockAddVehicles}
        deleteVehicle={mockDeleteVehicle}
        criterias={criterias}
        viewOffer={mockViewOffer}
        isNotEmptyPage
      />,
    );

    fireEvent.click(screen.getByText('Add Vehicle'));
    expect(mockAddVehicles).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getAllByText('View Offer')[0]);
    expect(mockViewOffer).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByTestId('del-compare-1'));
    expect(mockDeleteVehicle).toHaveBeenCalledTimes(1);
  });
});
