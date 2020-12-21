import React from 'react';
import preloadAll from 'jest-next-dynamic';
import renderer from 'react-test-renderer';
import CustomerAlsoViewedContainer from '../CustomerAlsoViewedContainer';
import { useProductCardDataQuery } from '../gql';

jest.mock('../gql');

jest.mock('core/organisms/carousel', () => ({
  __esModule: true,
  default: ({ children }: any) => (
    <div className="mocked-carousel">{children}</div>
  ),
}));

describe('<CustomerAlsoViewedContainer />', () => {
  beforeEach(async () => {
    await preloadAll();
  });

  it('renders correctly with loading', () => {
    (useProductCardDataQuery as jest.Mock).mockReturnValue({
      loading: true,
      data: undefined,
      error: undefined,
    });

    const getComponent = () => {
      return renderer
        .create(
          <CustomerAlsoViewedContainer capsId={['']} leaseType="PERSONAL" />,
        )
        .toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with error', () => {
    (useProductCardDataQuery as jest.Mock).mockReturnValue({
      loading: false,
      data: undefined,
      error: { message: 'message' },
    });

    const getComponent = () => {
      return renderer
        .create(
          <CustomerAlsoViewedContainer capsId={['']} leaseType="PERSONAL" />,
        )
        .toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with empty data', () => {
    (useProductCardDataQuery as jest.Mock).mockReturnValue({
      loading: false,
      data: { productCards: [] },
      error: undefined,
    });

    const getComponent = () => {
      return renderer
        .create(
          <CustomerAlsoViewedContainer capsId={['']} leaseType="PERSONAL" />,
        )
        .toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
