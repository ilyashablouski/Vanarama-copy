import React from 'react';
import renderer from 'react-test-renderer';

import Logo from '..';
import { ILogoProps } from '../interfaces';
import { TAsset } from '../types';

const optionalProps = {
  id: 'component',
  className: 'class',
};

function getComponent(props?: Partial<ILogoProps>, asset: TAsset = 'vanarama') {
  return renderer.create(<Logo asset={asset} {...props} />).toJSON();
}

describe('<Logo />', () => {
  it('renders correctly with Vanarama logo', () => {
    const tree = getComponent({}, 'vanarama');
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with BVRLA logo', () => {
    const tree = getComponent({}, 'bvrla');
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with optional props', () => {
    const tree = getComponent(optionalProps);
    expect(tree).toMatchSnapshot();
  });
});
