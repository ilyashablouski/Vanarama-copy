import React from 'react';
import renderer from 'react-test-renderer';

import Text from '../../text';

import Details from '..';
import { IDetailsProps } from '../interfaces';

const optionalProps = {
  summary: 'Summary',
  open: false,
};

const children = <Text>Text text text text text text text text.</Text>;

function getComponent(props?: IDetailsProps) {
  return renderer.create(<Details {...props}>{children}</Details>).toJSON();
}

describe('<Details />', () => {
  it('renders correctly', () => {
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with optional props', () => {
    const tree = getComponent(optionalProps);
    expect(tree).toMatchSnapshot();
  });
});
