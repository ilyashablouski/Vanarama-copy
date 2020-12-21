import React from 'react';
import renderer from 'react-test-renderer';

import Steps from '..';

describe('<Steps />', () => {
  it('renders correctly with children', () => {
    const tree = renderer
      .create(<Steps step={1} heading="heading" text="text" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
