import React from 'react';
import renderer from 'react-test-renderer';

import Rating from '..';
import { IRatingProps } from '../interfaces';

const optionalProps = {
  id: 'component',
  className: 'class',
  size: 'small' as const,
  color: 'orange' as const,
  max: 6,
};

const mandatoryProps = {
  score: 3.5,
};

function getComponent(props?: Partial<IRatingProps>) {
  return renderer
    .create(<Rating score={mandatoryProps.score} {...props} />)
    .toJSON();
}

describe('<Rating />', () => {
  it('renders correctly', () => {
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders without score', () => {
    const tree = getComponent({ ...optionalProps, score: 0 });
    expect(tree).toMatchSnapshot();
  });

  it('should not render without max', () => {
    const tree = getComponent({ ...optionalProps, max: 0 });
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with optional props', () => {
    const tree = getComponent(optionalProps);
    expect(tree).toMatchSnapshot();
  });
});
