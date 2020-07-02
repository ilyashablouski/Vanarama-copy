import React from 'react';
import renderer from 'react-test-renderer';
import FrequentlyAskedQuestions from '../FrequentlyAskedQuestions';

describe('<FrequentlyAskedQuestions />', () => {
  it('renders correctly with empty review', () => {
    const getComponent = () => {
      return renderer
        .create(<FrequentlyAskedQuestions rangeFAQTitle="" rangeFAQ={[]} />)
        .toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with rangeFAQ', () => {
    const getComponent = () => {
      return renderer
        .create(
          <FrequentlyAskedQuestions
            rangeFAQ={[
              {
                answer: 'text',
                question: 'author',
                id: 4,
              },
            ]}
            rangeFAQTitle="Nissan Navara"
          />,
        )
        .toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
