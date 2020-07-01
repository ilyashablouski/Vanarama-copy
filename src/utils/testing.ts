// eslint-disable-next-line import/no-extraneous-dependencies
import { fireEvent } from '@testing-library/react';

// eslint-disable-next-line import/prefer-default-export
export const inputChange = (element: Element, value: string) => {
  fireEvent.input(element, {
    target: { value },
  });
};
