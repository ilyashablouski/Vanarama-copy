import React from 'react';
import { shallow } from 'enzyme';
import Card from '../Card';

describe('<Card />', () => {
  it('should render correctly with children', () => {
    // ACT
    const wrapper = shallow(
      <Card>
        <p>Hello World</p>
      </Card>,
    );

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with a custom class name', () => {
    // ACT
    const wrapper = shallow(
      <Card className="some-custom-class-name">
        <p>Hello World</p>
      </Card>,
    );

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly only image', () => {
    // ACT
    const wrapper = shallow(
      <Card imageSrc="https://source.unsplash.com/collection/2102317/1000x650?sig=403440" />,
    );

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });

  it('Basic Card should render correctly', () => {
    // ACT
    const wrapper = shallow(
      <Card
        title={{
          title: 'Basic Card',
        }}
        description="Dolore Lorem culpa ea irure do ad exercitation cillum laborum culpa sint aliqua voluptate duis"
      />,
    );

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });

  it('Featured Review Card should render correctly', () => {
    // ACT
    const wrapper = shallow(
      <Card
        title={{
          title: '',
          link: (
            <a href="#" className="heading -large -black">
              Featured Review Card
            </a>
          ),
          score: 4.5,
        }}
        description="Minim consectetur adipisicing aute consequat velit exercitation enim deserunt occaecat sit ut incididunt dolor id"
        imageSrc="https://source.unsplash.com/collection/2102317/1000x650?sig=403440"
      />,
    );

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });

  it('Article Card should render correctly', () => {
    // ACT
    const wrapper = shallow(
      <Card
        title={{
          title: 'Article Card',
        }}
        description="Minim consectetur adipisicing aute consequat velit exercitation enim deserunt occaecat sit ut incididunt dolor id"
        imageSrc="https://source.unsplash.com/collection/2102317/1000x650?sig=403440"
      />,
    );

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });
});
