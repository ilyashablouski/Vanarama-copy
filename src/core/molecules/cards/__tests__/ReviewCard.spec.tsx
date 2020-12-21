import React from 'react';
import { shallow } from 'enzyme';
import ReviewCard from '../ReviewCard/ReviewCard';

describe('<ReviewCard />', () => {
  it('should render correctly', () => {
    // ACT
    const wrapper = shallow(
      <ReviewCard
        review={{
          text:
            'Cillum sit et in nostrud occaecat est labore ea laborum voluptate magna eu aliquip mollit',
          author: 'Review Card',
          score: 4.5,
        }}
      />,
    );

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });
});
