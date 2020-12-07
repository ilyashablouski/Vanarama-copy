import React from 'react';
import preloadAll from 'jest-next-dynamic';
import renderer from 'react-test-renderer';
import VehicleTechDetails from '../VehicleTechDetails';

describe('<VehicleTechDetails />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('renders correctly with props equal null', async () => {
    const getComponent = () => {
      return renderer
        .create(
          <VehicleTechDetails vehicleDetails={null} derivativeInfo={null} />,
        )
        .toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with props', async () => {
    const vehicleDetails = {
      standardEquipments: [
        {
          categoryDescription: 'categoryDescription',
          id: 'id',
          genericDescription: 'genericDescription',
          optionDescription: 'optionDescription',
        },
      ],
      technicals: [
        {
          categoryDescription: 'categoryDescription',
          id: 'id',
          technicalDescription: 'technicalDescription',
          value: 'value',
        },
      ],
    } as any;
    const derivativeInfo = {
      keyInformation: [
        {
          name: 'name',
          value: 'value',
        },
      ],
    } as any;

    const getComponent = () => {
      return renderer
        .create(
          <VehicleTechDetails
            vehicleDetails={vehicleDetails}
            derivativeInfo={derivativeInfo}
          />,
        )
        .toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
