import React from 'react';
import { shallow } from 'enzyme';
import OlafCard from '../OlafCard/OlafCard';

describe('<OlafCard />', () => {
  it('Olaf Card should render correctly', () => {
    // ACT
    const wrapper = shallow(
      <OlafCard
        olafDetails={{
          price: 209,
          priceDescription: 'Per Month Exc.VAT',
          initailRental: '£815.70 (inc VAT)',
          contractLength: '60 months',
          annualMileage: '6000 miles',
          fuel: 'Petrol',
          transmission: 'Manual',
          color: 'Solid - Polar white',
          trim: 'Cloth - Black',
          maintenance: 'No',
          description:
            '59 month contact (inc VAT). Paid by Direct Debit. First due ≈ 10 days after delivery.',
        }}
        title={{
          title: '',
          link: (
            <a href="#" className="heading -large -black">
              Order Card
            </a>
          ),
          score: 4.5,
          description: '1.4T ecoTEC Elite Nav 5dr',
          size: 'large',
          ratingSize: 'lead',
        }}
        imageSrc="https://source.unsplash.com/collection/2102317/1000x650?sig=403440"
      />,
    );

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });
});
