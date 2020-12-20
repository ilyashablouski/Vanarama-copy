import React from 'react';
import renderer from 'react-test-renderer';

import Tooltip from '..';
import { ITooltipProps } from '../interfaces';

const optionalProps = {
  id: 'component',
  className: 'class',
  color: 'teal' as const,
  position: 'bottom left',
};

const mandatoryProps = {
  text: 'Text text text text text',
};

function getComponent(props?: Partial<ITooltipProps>) {
  return renderer
    .create(<Tooltip text={mandatoryProps.text} {...props} />)
    .toJSON();
}

describe('<Tooltip />', () => {
  it('renders correctly', () => {
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with optional props', () => {
    const tree = getComponent(optionalProps);
    expect(tree).toMatchSnapshot();
  });
});
