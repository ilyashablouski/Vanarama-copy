import React from 'react';
import renderer from 'react-test-renderer';

import Icon from '..';
import { IIconProps } from '../interfaces';

import Add from '../../../assets/icons/Add';

const optionalProps = {
  className: 'class',
  size: 'small' as const,
  color: 'orange' as const,
};

const mandatoryProps = {
  icon: <Add />,
};

function getComponent(props?: Partial<IIconProps>) {
  return renderer
    .create(<Icon icon={mandatoryProps.icon} {...props} />)
    .toJSON();
}

function getComponentByName(props?: Partial<IIconProps>) {
  return renderer.create(<Icon name="Add" {...props} />).toJSON();
}

describe('<Icon />', () => {
  it('renders correctly', () => {
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with optional props', () => {
    const tree = getComponent(optionalProps);
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly by name', () => {
    const tree = getComponentByName();
    expect(tree).toMatchSnapshot();
  });
});
