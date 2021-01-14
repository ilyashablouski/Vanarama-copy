import React from 'react';
import { useLazyQuery } from '@apollo/client';
import preloadAll from 'jest-next-dynamic';
import renderer from 'react-test-renderer';
import CustomerAlsoViewedContainer from '../CustomerAlsoViewedContainer';

jest.mock('@apollo/client');

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
    (useLazyQuery as jest.Mock).mockReturnValue([
      jest.fn(),
      {
        loading: true,
        data: undefined,
        error: undefined,
      },
    ]);

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
    (useLazyQuery as jest.Mock).mockReturnValue([
      jest.fn(),
      {
        loading: false,
        data: undefined,
        error: { message: 'message' },
      },
    ]);

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
    (useLazyQuery as jest.Mock).mockReturnValue([
      jest.fn(),
      {
        loading: false,
        data: { productCards: [] },
        error: undefined,
      },
    ]);

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
