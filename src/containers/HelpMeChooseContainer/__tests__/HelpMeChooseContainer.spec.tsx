import React from 'react';
import preloadAll from 'jest-next-dynamic';
import renderer from 'react-test-renderer';
import HelpMeChooseContainer from '../HelpMeChooseContainer';

function getComponent(props: any) {
  return renderer.create(<HelpMeChooseContainer {...props} />).toJSON();
}

describe('<HelpMeChooseContainer />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('renders correctly', () => {
    const tree = getComponent({
      title: 'Which Fuel Type Do You Prefer?',
      choicesValues: [
        { label: 'Diesel', active: false, value: 'Diesel' },
        { label: 'Petrol', active: false, value: 'Petrol' },
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
        { label: 'Diesel', active: false, value: 'Diesel' },
        { label: 'Petrol', active: true, value: 'Petrol' },
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
