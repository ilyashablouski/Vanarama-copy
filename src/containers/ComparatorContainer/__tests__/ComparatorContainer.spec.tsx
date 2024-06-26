import React from 'react';
import renderer from 'react-test-renderer';
import preloadAll from 'jest-next-dynamic';
import ComparatorContainer from '../ComparatorContainer';
import { useVehicleData } from '../gql';
import cachedLeaseType from '../../../hooks/useLeaseType';
import { useVehiclesTotalCount } from '../../../gql/vehiclesTotalCount';

jest.mock('../gql');
jest.mock('../../../gql/vehiclesTotalCount');
jest.mock('../../../hooks/useLeaseType');

describe('<ComparatorContainer />', () => {
  beforeEach(async () => {
    await preloadAll();
  });

  it('should show error correctly', async () => {
    // ARRANGE
    (useVehicleData as jest.Mock).mockReturnValue({
      loading: false,
      data: undefined,
      error: { message: 'Error' },
    });
    (cachedLeaseType as jest.Mock).mockReturnValue({});
    (useVehiclesTotalCount as jest.Mock).mockReturnValue([
      () => {},
      { data: null },
    ]);

    const getComponent = () => {
      return renderer.create(<ComparatorContainer />).toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('should show loading correctly', async () => {
    // ARRANGE
    (useVehicleData as jest.Mock).mockReturnValue({
      loading: true,
      data: undefined,
      error: undefined,
    });
    (cachedLeaseType as jest.Mock).mockReturnValue({});
    (useVehiclesTotalCount as jest.Mock).mockReturnValue([
      () => {},
      { data: null },
    ]);

    const getComponent = () => {
      return renderer.create(<ComparatorContainer />).toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
