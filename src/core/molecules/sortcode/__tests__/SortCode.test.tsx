import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import SortCode from '../SortCode';
import { SortCodeValue } from '../interfaces';

describe('<SortCode />', () => {
  it('should allow typing into the first textbox', () => {
    // ARRANGE
    const onChangeMock = jest.fn();

    // ACT
    render(<SortCode value={['11', '22', '33']} onChange={onChangeMock} />);
    const first = screen.getAllByRole('textbox')[0];
    fireEvent.input(first, { target: { value: '0' } });

    // ASSERT
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock.mock.calls[0][1] as SortCodeValue).toEqual([
      '0',
      '22',
      '33',
    ]);
  });

  it('should allow typing into the middle textbox', () => {
    // ARRANGE
    const onChangeMock = jest.fn();

    // ACT
    render(<SortCode value={['11', '22', '33']} onChange={onChangeMock} />);
    const middle = screen.getAllByRole('textbox')[1];
    fireEvent.input(middle, { target: { value: '44' } });

    // ASSERT
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock.mock.calls[0][1] as SortCodeValue).toEqual([
      '11',
      '44',
      '33',
    ]);
  });

  it('should allow typing into the last textbox', () => {
    // ARRANGE
    const onChangeMock = jest.fn();

    // ACT
    render(<SortCode value={['11', '22', '']} onChange={onChangeMock} />);
    const last = screen.getAllByRole('textbox')[2];
    fireEvent.input(last, { target: { value: '77' } });

    // ASSERT
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock.mock.calls[0][1] as SortCodeValue).toEqual([
      '11',
      '22',
      '77',
    ]);
  });

  it('should not allow typing more than 2 characters', () => {
    // ARRANGE
    const onChangeMock = jest.fn();

    // ACT
    render(<SortCode value={['11', '22', '']} onChange={onChangeMock} />);
    const last = screen.getAllByRole('textbox')[2];
    fireEvent.input(last, { target: { value: '12' } });
    fireEvent.input(last, { target: { value: '123' } });
    fireEvent.input(last, { target: { value: '1234' } });

    // ASSERT
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock.mock.calls[0][1] as SortCodeValue).toEqual([
      '11',
      '22',
      '12',
    ]);
  });

  /**
   * NOTE: There was a bug which meant it was necessary to change the value to an array instead of a string.
   * When the values was "112233" and a "1" was removed from the first input, then the "2" was cascading down e.g.
   * [12] [23] [3 ].
   */
  it('should cascase characters down removing from the first input', () => {
    // ARRANGE
    const onChangeMock = jest.fn();

    // ACT
    render(<SortCode value={['11', '22', '33']} onChange={onChangeMock} />);
    const first = screen.getAllByRole('textbox')[0];
    fireEvent.input(first, { target: { value: '' } });

    // ASSERT
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock.mock.calls[0][1] as SortCodeValue).toEqual([
      '',
      '22',
      '33',
    ]);
  });
});
