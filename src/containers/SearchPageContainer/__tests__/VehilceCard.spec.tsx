import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
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
      viewOffer: jest.fn(),
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
          bodyStyleName: 'bodyStyleName',
          slug: 'slug',
          manufacturerName: 'Vauxhall',
          rangeName: 'Crossland X',
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
    // ACT
    render(<VehicleCard {...mocks} isPersonalPrice={false} />);

    // ASSERT
    expect(screen.getByText('Per Month Exc.VAT')).toBeInTheDocument();
  });
  it('should be open car page', async () => {
    // ACT
    render(<VehicleCard {...mocks} isPersonalPrice={false} />);

    // ASSERT
    fireEvent.click(screen.getByText('View Offer'));
    expect(mocks.viewOffer).toBeCalledWith({
      capId: '86343',
      href: '/car-leasing/[...manufacturer]',
      url: '/car-leasing/vauxhall/crossland-x/bodystylename/slug',
    });
  });
});
