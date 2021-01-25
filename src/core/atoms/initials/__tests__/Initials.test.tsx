import React from 'react';
import renderer from 'react-test-renderer';

import Initials from '..';

describe('<Initials />', () => {
  it('renders correctly with first/last name', () => {
    const tree = renderer
      .create(<Initials fullName="Gianluca Agnocchetti" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly first/last/second name', () => {
    const tree = renderer
      .create(<Initials fullName="Anastasya Irina Ciaccarina" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should return null', () => {
    const tree = renderer.create(<Initials fullName="" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
