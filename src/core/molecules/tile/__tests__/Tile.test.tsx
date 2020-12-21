import React from 'react';
import renderer from 'react-test-renderer';

import Tile from '..';
import { ITileProps } from '../interfaces';

const optionalProps = {
  color: 'orange' as const,
  scrollable: true,
};

function getComponent(props?: ITileProps) {
  return renderer
    .create(
      <Tile {...props}>
        <p>Child 1</p>
        <p>Child 2</p>
        <p>Child 3</p>
      </Tile>,
    )
    .toJSON();
}

describe('<Tile />', () => {
  it('renders correctly', () => {
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with optional props', () => {
    const tree = getComponent(optionalProps);
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when centered', () => {
    const tree = getComponent({ centered: true });
    expect(tree).toMatchSnapshot();
  });
});
