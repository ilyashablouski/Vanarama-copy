import Flame from '@vanarama/uibook/lib/assets/icons/Flame';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Rating from '@vanarama/uibook/lib/components/atoms/rating';
import Card, {
  CardContent,
  CardMedia,
} from '@vanarama/uibook/lib/components/molecules/card';
import StructuredList from '@vanarama/uibook/lib/components/organisms/structured-list';
import React from 'react';

const fakeData = [
  { label: 'Initial Rental', value: '£815.70 (inc VAT)' },
  { label: 'Contract Length', value: '60 months' },
  { label: 'Annual Mileage', value: '6000 miles' },
  { label: '£500 Damage Cover', value: 'Included' },
  { label: 'Maintanence', value: 'No' },
  { label: 'Fuel', value: 'Petrol' },
  { label: 'Transmission', value: 'Manual' },
  { label: 'Color', value: 'Solid - Polar White' },
  { label: 'Trim', value: 'Cloth - Black' },
];

const OLAFAside: React.FC = () => (
  <Card
    className="olaf-aside"
    flag={{
      accentIcon: <Icon icon={<Flame />} color="white" />,
      accentText: 'Hot Deal',
      text: 'In Stock - 14-21 Days Delivery',
    }}
  >
    <CardMedia imageSrc="https://res.cloudinary.com/diun8mklf/image/upload/v1581538983/cars/HondaHRV0319_7_nmblcf.jpg" />
    <CardContent>
      <hgroup>
        <Heading tag="a" color="black" size="large">
          Hyundai Tucson Estate
        </Heading>
        <Heading tag="h5" color="darker" size="xsmall">
          1.0 IG-T 100 Tekna 5dr Xtronic [Leather]
        </Heading>
        <Rating color="orange" size="regular" max={5} score={4.5} />
      </hgroup>
      <StructuredList
        heading="59 month contact (inc VAT). Paid by Direct Debit. First due ≈ 10 days after delivery."
        headingSize="xsmall"
        list={fakeData}
        priceTag={{ info: 'Per Month Exc. VAT', price: 269.99 }}
      />
    </CardContent>
  </Card>
);

export default OLAFAside;
