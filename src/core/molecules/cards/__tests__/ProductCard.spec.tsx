import React from 'react';
import { shallow } from 'enzyme';
import ProductCard from '../ProductCard/ProductCard';

describe('<ProductCard />', () => {
  it('Product Card should render correctly', () => {
    // ACT
    const wrapper = shallow(
      <ProductCard
        header={{
          accentText: 'Hot Deal',
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
    expect(wrapper).toMatchSnapshot();
  });
});
