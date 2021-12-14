import React from 'react';
import renderer from 'react-test-renderer';

import ImageV2 from 'core/atoms/image/ImageV2';
import Image from '..';
import { IImageProps, IImageV2Props } from '../interfaces';

const optionalProps = {
  id: 'component',
  className: 'class',
  size: 'small' as const,
  color: 'orange' as const,
};

const mandatoryProps = {
  src: 'https://source.unsplash.com/collection/2102317/1000x650?sig=40349',
};

function getComponentImage(props?: Partial<IImageProps>) {
  return renderer
    .create(<Image src={mandatoryProps.src} {...props} />)
    .toJSON();
}

function getComponentImageV2(props?: Partial<IImageV2Props>) {
  return renderer
    .create(<ImageV2 src={mandatoryProps.src} {...props} />)
    .toJSON();
}

describe('<Image />', () => {
  it('renders Image correctly', () => {
    const tree = getComponentImage();
    expect(tree).toMatchSnapshot();
  });

  it('renders Image correctly with optional props', () => {
    const tree = getComponentImage(optionalProps);
    expect(tree).toMatchSnapshot();
  });
});

describe('<ImageV2 />', () => {
  it('renders ImageV2 correctly', () => {
    const tree = getComponentImageV2();
    expect(tree).toMatchSnapshot();
  });

  it('renders ImageV2 correctly with optional props', () => {
    const tree = getComponentImageV2(optionalProps);
    expect(tree).toMatchSnapshot();
  });
});
