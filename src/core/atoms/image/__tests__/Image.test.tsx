import React from 'react';
import renderer from 'react-test-renderer';

import Image from '..';
import { IImageProps } from '../interfaces';

const optionalProps = {
  id: 'component',
  className: 'class',
  size: 'small' as const,
  color: 'orange' as const,
};

const mandatoryProps = {
  src: 'https://source.unsplash.com/collection/2102317/1000x650?sig=40349',
};

function getComponent(props?: Partial<IImageProps>) {
  return renderer
    .create(<Image src={mandatoryProps.src} {...props} />)
    .toJSON();
}

describe('<Image />', () => {
  it('renders correctly', () => {
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with optional props', () => {
    const tree = getComponent(optionalProps);
    expect(tree).toMatchSnapshot();
  });
});
