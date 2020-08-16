import renderer from 'react-test-renderer';
import React from 'react';

import ArticleHead from '../ArticleHead';

const props = {
  title: 'Article Title',
};

describe('<ArticleHead />', () => {
  it('renders correctly', () => {
    const getComponent = () => {
      return renderer.create(<ArticleHead title={props.title} />).toJSON();
    };
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
