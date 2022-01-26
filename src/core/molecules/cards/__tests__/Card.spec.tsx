import React from 'react';
import { render } from '@testing-library/react';
import Card from '../Card';

describe('<Card />', () => {
  it('should render correctly with children', () => {
    // ACT
    const { container } = render(
      <Card>
        <p>Hello World</p>
      </Card>,
    );

    // ASSERT
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with a custom class name', () => {
    // ACT
    const { container } = render(
      <Card className="some-custom-class-name">
        <p>Hello World</p>
      </Card>,
    );

    // ASSERT
    expect(container).toMatchSnapshot();
  });

  it('should render correctly only image', () => {
    // ACT
    const { container } = render(
      <Card imageSrc="https://source.unsplash.com/collection/2102317/1000x650?sig=403440" />,
    );

    // ASSERT
    expect(container).toMatchSnapshot();
  });

  it('Basic Card should render correctly', () => {
    // ACT
    const { container } = render(
      <Card
        title={{
          title: 'Basic Card',
        }}
        description="Dolore Lorem culpa ea irure do ad exercitation cillum laborum culpa sint aliqua voluptate duis"
      />,
    );

    // ASSERT
    expect(container).toMatchSnapshot();
  });

  it('Featured Review Card should render correctly', () => {
    // ACT
    const { container } = render(
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
    expect(container).toMatchSnapshot();
  });

  it('Article Card should render correctly', () => {
    // ACT
    const { container } = render(
      <Card
        title={{
          title: 'Article Card',
        }}
        description="Minim consectetur adipisicing aute consequat velit exercitation enim deserunt occaecat sit ut incididunt dolor id"
        imageSrc="https://source.unsplash.com/collection/2102317/1000x650?sig=403440"
      />,
    );

    // ASSERT
    expect(container).toMatchSnapshot();
  });
});
