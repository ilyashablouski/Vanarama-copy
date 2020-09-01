import React from 'react';
import renderer from 'react-test-renderer';
import CustomerAlsoViewedContainer from '../CustomerAlsoViewedContainer';
import { useProductCardData } from '../gql';

jest.mock('../gql');

jest.mock('@vanarama/uibook/lib/components/organisms/carousel', () => ({
  __esModule: true,
  default: ({ children }: any) => (
    <div className="mocked-carousel">{children}</div>
  ),
}));

describe('<CustomerAlsoViewedContainer />', () => {
  it('renders correctly with loading', () => {
    (useProductCardData as jest.Mock).mockReturnValue({
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
    (useProductCardData as jest.Mock).mockReturnValue({
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
    (useProductCardData as jest.Mock).mockReturnValue({
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
