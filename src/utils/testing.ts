/* eslint-disable import/no-extraneous-dependencies */
import { wait } from '@apollo/react-testing';
import { ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

export const submitForm = async (wrapper: ReactWrapper) => {
  // Because react-hook-form uses hooks, we need to wrap in `act` to stop warning occuring
  await act(async () => {
    // Submit the form
    wrapper.simulate('submit');
    // Wait for the form effects to finish
    await wait(0);
    // Wait for the mutation to finish
    await wait(0);
  });

  wrapper.update();
};

export const assertTextEquals = (wrapper: ReactWrapper, id: string) => (
  expected: string,
) =>
  expect(
    wrapper
      .find(id)
      .last()
      .text(),
  ).toEqual(expected);

export const getElementById = (id: string) => (wrapper: ReactWrapper) =>
  wrapper.find(`#${id}`).last();
