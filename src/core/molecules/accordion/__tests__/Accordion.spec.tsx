import React from 'react';
import { shallow } from 'enzyme';
import Accordion from '../Accordion';

describe('<Accordion />', () => {
  it('should render correctly', () => {
    // ACT
    const wrapper = shallow(
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
    expect(wrapper).toMatchSnapshot();
  });
});
