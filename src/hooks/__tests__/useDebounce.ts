import { renderHook, act } from '@testing-library/react-hooks';
import useDebounce from '../useDebounce';

describe('useDebounce', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should not debounce the initial value', () => {
    const { result } = renderHook(value => useDebounce(value), {
      initialProps: 'inital',
    });

    // Force run all setTimeouts
    jest.runAllTimers();
    expect(result.current).toEqual(undefined);
  });

  it('should debounce changes to the initial value', () => {
    const { result, rerender } = renderHook(value => useDebounce(value), {
      initialProps: 'inital',
    });

    // Force run all setTimeouts
    jest.runAllTimers();
    // Verify the result has not changed as this is the first render
    expect(result.current).toEqual(undefined);

    // Re-render the hook with a different value and wait for the debounce period
    act(() => {
      rerender('updated');
      jest.runAllTimers();
    });

    // The hook should have updated the value
    expect(result.current).toEqual('updated');
  });

  it('should be able to specify a custom debounce period', () => {
    const { result, rerender } = renderHook(value => useDebounce(value, 500), {
      initialProps: 'inital',
    });

    // Update the value and run all timers to just short of the duration
    act(() => {
      rerender('updated');
      jest.advanceTimersByTime(499);
    });

    // The value should not be updated yet as the debounce period has not expired
    expect(result.current).toEqual(undefined);

    // Run to the end of the debounce period
    act(() => {
      jest.advanceTimersByTime(1);
    });

    // The value should now be updated
    expect(result.current).toEqual('updated');
  });
});
