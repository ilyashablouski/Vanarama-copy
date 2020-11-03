import React from 'react';
import renderer from 'react-test-renderer';
import Loadable from 'react-loadable';
// import FrequentlyAskedQuestions from '../FrequentlyAskedQuestions';

const FrequentlyAskedQuestions = Loadable({
  loader: () => import('../FrequentlyAskedQuestions'),
  loading() {
    return <div>Loading...</div>;
  },
});

FrequentlyAskedQuestions.preload();

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
