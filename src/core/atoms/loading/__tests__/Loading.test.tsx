import React from 'react';
import renderer from 'react-test-renderer';

import Loading from '..';
import { ILoadingProps } from '../interfaces';

const optionalProps = {
  id: 'component',
  className: 'class',
  size: 'small' as const,
};

function getComponent(props?: ILoadingProps) {
  return renderer.create(<Loading {...props} />).toJSON();
}

describe('<Loading />', () => {
  it('renders correctly', () => {
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with optional props', () => {
    const tree = getComponent(optionalProps);
    expect(tree).toMatchSnapshot();
  });
});
