import React from 'react';
import renderer from 'react-test-renderer';

import { fireEvent, render, screen } from '@testing-library/react';
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
    render(<Pagination {...mandatoryProps} onClick={onClick} />);
    fireEvent.click(screen.getByText('3'));
  });
});
