import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import Pagination from '..';

const mandatoryProps = {
  pages: [1, 2, 3, 4, 5, 6, 7, 8],
  selected: 3,
  path: 'page',
};

function getComponent() {
  return renderer.create(<Pagination {...mandatoryProps} />).toJSON();
}

describe('<Pagination />', () => {
  it('renders correctly', () => {
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('should be able to click the pagination', () => {
    const onClick = jest.fn();
    const element = mount(<Pagination {...mandatoryProps} onClick={onClick} />);
    element.find('.pagination').simulate('click');
  });
});
