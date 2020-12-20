import React from 'react';
import renderer from 'react-test-renderer';

import Score from '..';
import { IScoreProps } from '../interfaces';

function getComponent(props: IScoreProps) {
  return renderer.create(<Score score={props.score} />).toJSON();
}

describe('<Score />', () => {
  it('renders correctly with a negative score', () => {
    const tree = getComponent({ score: -10 });
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with a score of zero', () => {
    const tree = getComponent({ score: 0 });
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with a score above 100', () => {
    const tree = getComponent({ score: 101 });
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with a failure score', () => {
    const tree = getComponent({ score: 44 });
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with a partial score', () => {
    const tree = getComponent({ score: 50 });
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with a success score', () => {
    const tree = getComponent({ score: 90 });
    expect(tree).toMatchSnapshot();
  });
});
