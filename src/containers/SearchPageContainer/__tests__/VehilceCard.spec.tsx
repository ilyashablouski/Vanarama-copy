import React from 'react';
import renderer from 'react-test-renderer';
import VehicleCard from '../VehicleCard';
import { VehicleTypeEnum } from '../../../../generated/globalTypes';

describe('<VehicleCard />', () => {
  const resetMocks = () => {
    return {
      title: {
        title: '',
        link: (
          <a href="/" className="heading -large -black">
            test
          </a>
        ),
        description: 'test',
        score: 4.5,
      },
      isPersonalPrice: true,
      data: {
        averageRating: 0,
        businessRate: 138.91,
        capId: '86343',
        derivativeName: '1.2 [83] Elite Nav 5dr',
        imageUrl:
          'https://images.autorama.co.uk/Photos/Cap/Vehicles/157703/cap-86343-157703.jpg',
        isOnOffer: false,
        keyInformation: [{ name: 'Transmission', value: 'Manual' }],
        leadTime: 'Factory Order',
        manufacturerName: 'Vauxhall',
        offerPosition: null,
        personalRate: 189.97,
        rangeName: 'Crossland X',
        vehicleType: VehicleTypeEnum.CAR,
      },
    };
  };

  const mocks = resetMocks();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be render correctly', async () => {
    // ACT
    const getComponent = () => {
      return renderer.create(<VehicleCard {...mocks} />).toJSON();
    };
    // ASSERT
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
