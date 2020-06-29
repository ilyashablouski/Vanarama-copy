import React from 'react';
import renderer from 'react-test-renderer';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Flame from '@vanarama/uibook/lib/assets/icons/Flame';
import VehicleCard from '../VehicleCard';

describe('<SearchPageContainer />', () => {
  const resetMocks = () => {
    return {
      header: {
        accentIcon: (
          <Icon icon={<Flame />} color="white" className="md hydrated" />
        ),
        accentText: 'Hot Deal',
        text: 'In Stock - 14-21 Days Delivery',
      },
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
      price: null,
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
