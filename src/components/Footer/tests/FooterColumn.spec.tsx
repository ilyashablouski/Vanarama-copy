import React from 'react';
import preloadAll from 'jest-next-dynamic';
import renderer from 'react-test-renderer';
import FooterColumn from '../FooterColumn';

describe('<FooterColumn />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('renders correctly with body', () => {
    const getComponent = () => {
      return renderer
        .create(
          <FooterColumn
            linkGroup={{
              body: 'test',
              links: null,
              name: 'GET IN TOUCH WITH US',
              linkGroups: null,
            }}
          />,
        )
        .toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly with links', () => {
    const getComponent = () => {
      return renderer
        .create(
          <FooterColumn
            linkGroup={{
              body: 'test',
              links: [
                {
                  text: 'Van Leasing',
                  url: 'https://vanarama.com/van-leasing.html',
                },
                {
                  text: 'Pickup Truck Leasing',
                  url: 'https://vanarama.com/pickup-truck-leasing.html',
                },
                {
                  text: 'Van Reviews',
                  url: 'https://vanarama.com/van-reviews.html',
                },
              ],
              name: 'VANS & TRUCKS',
              linkGroups: null,
            }}
          />,
        )
        .toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
