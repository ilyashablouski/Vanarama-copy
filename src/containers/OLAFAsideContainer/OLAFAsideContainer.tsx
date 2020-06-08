import OLAFAside from '@vanarama/uibook/lib/components/organisms/olaf-aside/OlafAside';
import React from 'react';

const OLAFAsideContainer: React.FC = () => (
  <OLAFAside
    annualMileage="6000 miles"
    color="Solid - Polar white"
    contractLength="60 months"
    fuel="Petrol"
    imageSrc="https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538983/cars/KiaeNiro0219_j7on5z.jpg"
    initailRental="£815.70 (inc VAT)"
    price={209}
    rating={4.5}
    subtitle="1.4T ecoTEC Elite Nav 5dr"
    title="FIAT 500 Hatchback"
    transmission="Manual"
    trim="Cloth - Black"
  />
);

export default OLAFAsideContainer;
