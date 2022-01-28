import React from 'react';
import { render } from '@testing-library/react';
import IconList from '../IconList';
import IconListItem from '../IconListItem';

describe('<IconList />', () => {
  it('renders correctly with default <IconListItem /> child', () => {
    const { container } = render(
      <IconList>
        <IconListItem>hello world</IconListItem>
      </IconList>,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders correctly with optional props', () => {
    const { container } = render(
      <IconList textColor="teal" dataTestId="testID">
        <li>hello world</li>
      </IconList>,
    );
    expect(container).toMatchSnapshot();
  });
});

describe('<IconListItem />', () => {
  it('renders correctly with children', () => {
    const { container } = render(<IconListItem>hello world</IconListItem>);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly with optional props', () => {
    const { container } = render(
      <IconListItem iconColor="orange" dataTestId="testID2">
        hello world
      </IconListItem>,
    );
    expect(container).toMatchSnapshot();
  });
});
