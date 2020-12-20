import { renderHook } from '@testing-library/react-hooks';
import useLoqate from '..';

describe('useLoqate hook', () => {
  let fetch: any;
  beforeEach(() => {
    // Store the real value of fetch
    fetch = (global as any).fetch;
  });

  afterEach(() => {
    // Restore fetch to its previous state
    (global as any).fetch = fetch;
  });

  it('should fetch results correctly', async () => {
    // ARRANGE
    (global as any).fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        Items: [
          {
            Id: '1',
            Type: 'Address',
            Text: '123 Fake Street',
            Description: 'Fakenham',
          },
          {
            Id: '2',
            Type: 'Address',
            Text: 'Fakenham Town Hall',
            Description: 'Fakenham',
          },
        ],
      }),
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useLoqate(
        { text: 'fake' },
        { apiKey: 'SOME_API_KEY', country: 'GB', limit: 10 },
      ),
    );

    await waitForNextUpdate();

    // ASSERT
    expect(result).toMatchSnapshot();
  });

  it('should return an error if the fetch fails', async () => {
    // ARRANGE
    (global as any).fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn().mockRejectedValue(new Error('No JSON')),
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useLoqate(
        { text: 'fake' },
        { apiKey: 'SOME_API_KEY', country: 'GB', limit: 10 },
      ),
    );

    await waitForNextUpdate();

    // ASSERT
    expect(result).toMatchSnapshot();
  });
});
