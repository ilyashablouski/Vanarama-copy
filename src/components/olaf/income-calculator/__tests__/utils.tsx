import { fireEvent } from '@testing-library/react';

test.skip('skip to ignore the warning message', () => {});

// eslint-disable-next-line import/prefer-default-export
export const inputChange = (getByLabelText: any, value: string) => {
  fireEvent.input(getByLabelText, {
    target: { value },
  });
};
