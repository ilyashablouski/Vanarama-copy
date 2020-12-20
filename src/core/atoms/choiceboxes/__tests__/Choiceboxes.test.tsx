import React from 'react';
import renderer from 'react-test-renderer';

import Choiceboxes from '../Choiceboxes';
import { IChoiceboxesProps } from '../interfaces';

function getComponent(props: IChoiceboxesProps) {
  return renderer.create(<Choiceboxes {...props} />).toJSON();
}

describe('<Choiceboxes />', () => {
  it('renders correctly', () => {
    const choices = [
      { label: 'Personal', value: 'PCH', active: true },
      { label: 'Business', value: 'BCH', active: false },
    ];

    const tree = getComponent({ choices, onSubmit: () => {} });
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const choices = [
      { label: '13', value: '13', active: true },
      { label: '23', value: '23', active: false },
      { label: '43', value: '43', active: false },
      { label: '45', value: '45', active: false },
      { label: '25763', value: '25763', active: false },
    ];

    const tree = getComponent({ choices, onSubmit: () => {} });
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const choices = [
      { label: '13', value: '13', active: true },
      { label: '23', value: '23', active: false },
      { label: '45', value: '45', active: false },
      { label: '47', value: '47', active: false },
      { label: '25763', value: '25763', active: false },
    ];

    const tree = getComponent({
      choices,
      onSubmit: () => {},
      color: 'black',
      clearMultiSelectTitle: 'clear',
    });
    expect(tree).toMatchSnapshot();
  });
});
