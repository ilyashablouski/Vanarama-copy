import React from 'react';
import renderer from 'react-test-renderer';
import CustomerReviews from '../CustomerReviews';

describe('<CustomerReviews />', () => {
  it('renders correctly with empty review', () => {
    const getComponent = () => {
      return renderer
        .create(<CustomerReviews title="Customer Reviews" reviews={[]} />)
        .toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with reviews', () => {
    const getComponent = () => {
      return renderer
        .create(
          <CustomerReviews
            title="Customer Reviews"
            reviews={[
              {
                text: 'text',
                author: 'author',
                score: 4,
              },
            ]}
          />,
        )
        .toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
