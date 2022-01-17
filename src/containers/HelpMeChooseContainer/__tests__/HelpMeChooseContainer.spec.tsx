import React from 'react';
import preloadAll from 'jest-next-dynamic';
import renderer from 'react-test-renderer';
import { fireEvent, render, screen } from '@testing-library/react';
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
      dataUiTestId: 'test-ui-id',
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
      dataUiTestId: 'test-ui-id',
    });

    expect(tree).toMatchSnapshot();
  });

  it('test for setChoice function when multiSelect=true and have default value', () => {
    const setChoiceMock = jest.fn();
    render(
      <HelpMeChooseContainer
        title="Which Fuel Type Do You Prefer?"
        choicesValues={[
          { label: 'Diesel', active: false, value: 'Diesel' },
          { label: 'Petrol', active: true, value: 'Petrol' },
        ]}
        setChoice={setChoiceMock}
        multiSelect
        currentValue={['Petrol']}
        onClickContinue={jest.fn()}
        clearMultiSelectTitle="I Don't Mind"
        dataUiTestId="test-ui-id"
      />,
    );
    fireEvent.click(screen.getByText('Diesel'));
    expect(setChoiceMock).toBeCalledWith(['Petrol', 'Diesel']);
  });

  it('test for setChoice function when multiSelect=true and have no default value', () => {
    const setChoiceMock = jest.fn();
    render(
      <HelpMeChooseContainer
        title="Which Fuel Type Do You Prefer?"
        choicesValues={[
          { label: 'Diesel', active: false, value: 'Diesel' },
          { label: 'Petrol', active: true, value: 'Petrol' },
        ]}
        setChoice={setChoiceMock}
        multiSelect
        currentValue={[]}
        onClickContinue={jest.fn()}
        clearMultiSelectTitle="I Don't Mind"
        dataUiTestId="test-ui-id-2"
      />,
    );
    fireEvent.click(screen.getByText('Diesel'));
    expect(setChoiceMock).toBeCalledWith(['Diesel']);
  });

  it('test for setChoice function when multiSelect=false', () => {
    const setChoiceMock = jest.fn();
    render(
      <HelpMeChooseContainer
        title="Which Fuel Type Do You Prefer?"
        choicesValues={[
          { label: 'Diesel', active: false, value: 'Diesel' },
          { label: 'Petrol', active: true, value: 'Petrol' },
        ]}
        setChoice={setChoiceMock}
        multiSelect={false}
        currentValue={[]}
        onClickContinue={jest.fn()}
        clearMultiSelectTitle="I Don't Mind"
        dataUiTestId="test-ui-id-3"
      />,
    );
    fireEvent.click(screen.getByText('Diesel'));
    expect(setChoiceMock).toBeCalledWith(['Diesel']);
  });

  it('test for setChoice function when multiSelect=true and user remove default value', () => {
    const setChoiceMock = jest.fn();
    render(
      <HelpMeChooseContainer
        title="Which Fuel Type Do You Prefer?"
        choicesValues={[
          { label: 'Diesel', active: false, value: 'Diesel' },
          { label: 'Petrol', active: true, value: 'Petrol' },
        ]}
        setChoice={setChoiceMock}
        multiSelect
        currentValue={['Petrol']}
        onClickContinue={jest.fn()}
        clearMultiSelectTitle="I Don't Mind"
        dataUiTestId="test-ui-id-4"
      />,
    );
    fireEvent.click(screen.getByText('Petrol'));
    expect(setChoiceMock).toBeCalledWith([]);
  });

  it('test for onClearClick function ', () => {
    const setChoiceMock = jest.fn();
    render(
      <HelpMeChooseContainer
        title="Which Fuel Type Do You Prefer?"
        choicesValues={[
          { label: 'Diesel', active: false, value: 'Diesel' },
          { label: 'Petrol', active: true, value: 'Petrol' },
        ]}
        setChoice={setChoiceMock}
        multiSelect
        currentValue={['Petrol']}
        onClickContinue={jest.fn()}
        clearMultiSelectTitle="I Don't Mind"
        dataUiTestId="test-ui-id-5"
      />,
    );
    fireEvent.click(screen.getByText("I Don't Mind"));
    expect(setChoiceMock).toBeCalledWith(['']);
  });
});
