import React from 'react';
import preloadAll from 'jest-next-dynamic';
import renderer from 'react-test-renderer';
import Lease from '../Lease';

const getComponent = () => {
  return renderer
    .create(
      <Lease
        title="Find Out If You Can Lease A Brand-New Car"
        body={`Et sunt irure sunt dolore laboris dolore mollit amet enim fugiat in qui
              sunt mollit magna sint consectetur cillum consequat excepteur nisi
              pariatur laborum aute minim voluptate dolor ex adipisicing aliqua sit
              ipsum reprehenderit amet ut nostrud sint do exercitation`}
        video="https://player.vimeo.com/video/263419265"
      />,
    )
    .toJSON();
};

describe('<Lease />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('renders correctly', () => {
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
