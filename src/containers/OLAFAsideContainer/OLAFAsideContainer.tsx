import React from 'react';
import Card from '@vanarama/uibook/lib/components/molecules/card';
import RouterLink from '../../components/RouterLink/RouterLink';

const OLAFAsideContainer: React.FC = () => (
  <Card
    orderDetails={{
      annualMileage: '6000 miles',
      color: 'Solid - Polar white',
      contractLength: '60 months',
      fuel: 'Petrol',
      initailRental: '£815.70 (inc VAT)',
      price: 209,
      transmission: 'Manual',
      trim: 'Cloth - Black',
      available: 'Now',
      orderNumber: 'orderNumber',
      orderDate: 'orderDate',
      orderButton: <RouterLink link={{ href: '', label: '' }} />,
    }}
    imageSrc="https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538983/cars/KiaeNiro0219_j7on5z.jpg"
    title={{
      title: 'FIAT 500 Hatchback',
      description: '1.4T ecoTEC Elite Nav 5dr',
      score: 4.5,
    }}
  />
);

export default OLAFAsideContainer;
