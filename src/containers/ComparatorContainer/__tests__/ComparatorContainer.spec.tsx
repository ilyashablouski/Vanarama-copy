import React from 'react';
import renderer from 'react-test-renderer';
import ComparatorContainer from '../ComparatorContainer';
import { useVehicleData } from '../gql';

jest.mock('../gql');

describe('<ComparatorContainer />', () => {
  it('should show error correctly', async () => {
    // ARRANGE
    (useVehicleData as jest.Mock).mockReturnValue({
      loading: false,
      data: undefined,
      error: { message: 'Error' },
    });

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

    const getComponent = () => {
      return renderer.create(<ComparatorContainer />).toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
