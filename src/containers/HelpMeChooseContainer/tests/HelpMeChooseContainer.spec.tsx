import React from 'react';
import renderer from 'react-test-renderer';
import HelpMeChooseContainer from '../HelpMeChooseContainer';

function getComponent(props: any) {
  return renderer.create(<HelpMeChooseContainer {...props} />).toJSON();
}

describe('<HelpMeChooseContainer />', () => {
  it('renders correctly', () => {
    const tree = getComponent({
      title: 'Which Fuel Type Do You Prefer?',
      choicesValues: [
        { label: 'Diesel', active: false },
        { label: 'Petrol', active: false },
      ],
      setChoice: jest.fn(),
      multiSelect: true,
      currentValue: [],
      onClickContinue: jest.fn(),
      clearMultiSelectTitle: "I Don't Mind",
    });

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const tree = getComponent({
      title: 'Which Fuel Type Do You Prefer?',
      choicesValues: [
        { label: 'Diesel', active: false },
        { label: 'Petrol', active: true },
      ],
      setChoice: jest.fn(),
      multiSelect: true,
      currentValue: ['Petrol'],
      onClickContinue: jest.fn(),
      clearMultiSelectTitle: "I Don't Mind",
    });

    expect(tree).toMatchSnapshot();
  });
});
