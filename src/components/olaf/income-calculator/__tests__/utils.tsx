import { fireEvent } from '@testing-library/react';

// eslint-disable-next-line import/prefer-default-export
export const inputChange = (getByLabelText: any, value: string) => {
  fireEvent.input(getByLabelText, {
    target: { value },
  });
};
