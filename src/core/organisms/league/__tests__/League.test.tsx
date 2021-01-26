import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';

import League from '..';
import { ILeagueProps } from '../interfaces';

const optionalProps = {
  clickReadMore: jest.fn(),
  altText: 'image1',
  link: '',
};

function getComponent(props?: ILeagueProps) {
  return renderer
    .create(<League clickReadMore={jest.fn()} {...props} link="" />)
    .toJSON();
}

describe('<League />', () => {
  it('renders correctly', () => {
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with optional props', () => {
    const tree = getComponent(optionalProps);
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with optional props', () => {
    render(<League {...optionalProps} />);
    fireEvent.click(screen.getByText('Here'));
    expect(optionalProps.clickReadMore).toBeCalledTimes(1);
  });
});
