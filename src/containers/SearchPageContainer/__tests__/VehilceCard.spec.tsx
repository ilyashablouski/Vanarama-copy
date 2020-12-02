import React from 'react';
import renderer from 'react-test-renderer';
// import { render, screen } from '@testing-library/react';
import preloadAll from 'jest-next-dynamic';
import { VehicleTypeEnum } from '../../../../generated/globalTypes';

import VehicleCard from '../VehicleCard';

describe('<VehicleCard />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  const resetMocks = () => {
    return {
      url: '/car-leasing/vauxhall/crossland-x/bodystylename/slug',
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
      onCompare: jest.fn(),
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
      dataDerivatives: [
        {
          bodyStyle: { name: 'bodyStyleName' },
          slug: 'slug',
          manufacturer: { name: 'Vauxhall', slug: 'vauxhall' },
          range: { name: 'Crossland X', slug: 'crossland-x' },
          model: { name: 'Crossland X', slug: 'crossland-x' },
          id: '86343',
        } as any,
      ],
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
  it('should be render bussiness price', async () => {
    const getComponent = () => {
      return renderer
        .create(<VehicleCard {...mocks} isPersonalPrice={false} />)
        .toJSON();
    };
    // ASSERT
    const tree = getComponent();
    expect(tree).toMatchSnapshot();

    // // ACT
    // render(<VehicleCard {...mocks} isPersonalPrice={false} />);

    // // ASSERT
    // expect(screen.getByText('Per Month Exc.VAT')).toBeInTheDocument();
  });
  it('should have link in View Offer', async () => {
    const getComponent = () => {
      return renderer
        .create(<VehicleCard {...mocks} isPersonalPrice={false} />)
        .toJSON();
    };
    // ASSERT
    const tree = getComponent();
    expect(tree).toMatchSnapshot();

    // // ACT
    // render(<VehicleCard {...mocks} isPersonalPrice={false} />);

    // // ASSERT
    // expect(screen.getByTestId('view-offer')).toHaveAttribute(
    //   'href',
    //   '/car-leasing/vauxhall/crossland-x/bodystylename/slug',
    // );
  });
});
