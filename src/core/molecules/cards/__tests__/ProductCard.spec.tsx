import React from 'react';
import { render } from '@testing-library/react';
import ProductCard from '../ProductCard/ProductCard';

describe('<ProductCard />', () => {
  it('Product Card should render correctly', () => {
    // ACT
    const wrapper = render(
      <ProductCard
        header={{
          accentText: 'Hot Offer',
          text: 'In Stock - 14-21 Days Delivery',
        }}
        description="Minim consectetur adipisicing aute consequat velit exercitation enim deserunt occaecat sit ut incididunt dolor id"
        imageSrc="https://source.unsplash.com/collection/2102317/1000x650?sig=403440"
        features={[]}
        title={{
          title: '',
          link: (
            <a href="#" className="heading -large -black">
              Peugeot 208
            </a>
          ),
          description: '1.0 IG-T 100 Tekna 5dr Xtronic [Leather]',
          score: 4.5,
        }}
      />,
    );

    // ASSERT
    expect(wrapper.container).toMatchSnapshot();
  });
});
