import React from 'react';
import renderer from 'react-test-renderer';

import Dropdown from '..';
import { IDropdownProps } from '../interfaces';

const mandatoryProps: IDropdownProps = {
  label: 'Dropdown',
  children: (
    <>
      <span>One</span>
      <span>Two</span>
      <span>Three</span>
    </>
  ),
};

function getComponent() {
  return renderer
    .create(
      <Dropdown label={mandatoryProps.label}>
        {mandatoryProps.children}
      </Dropdown>,
    )
    .toJSON();
}

describe('<Dropdown />', () => {
  it('renders correctly', () => {
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
