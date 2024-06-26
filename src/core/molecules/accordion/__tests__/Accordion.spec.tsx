import React from 'react';
import { render } from '@testing-library/react';
import Accordion from '../Accordion';

describe('<Accordion />', () => {
  it('should render correctly', () => {
    // ACT
    const { container } = render(
      <Accordion
        items={[
          {
            id: 1,
            title: 'Fugiat Labore Adipisicing Nisi Ipsum',
            children:
              'Consectetur eu esse cupidatat laborum duis laborum magna elit consectetur nulla minim non dolor dolor quis',
          },
          {
            id: 2,
            title: 'Eu Sit Occaecat Do Enim',
            children:
              'Consectetur eu esse cupidatat laborum duis laborum magna elit consectetur nulla minim non dolor dolor quis',
          },
        ]}
      />,
    );

    // ASSERT
    expect(container).toMatchSnapshot();
  });
});
