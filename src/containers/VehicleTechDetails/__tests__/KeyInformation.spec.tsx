import React from 'react';
import preloadAll from 'jest-next-dynamic';
import renderer from 'react-test-renderer';
import KeyInformation from '../KeyInformation';

describe('<KeyInformation />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('renders correctly with data', async () => {
    const keysInformation = [
      {
        name: 'name',
        value: 'value',
      },
    ];
    const getComponent = () => {
      return renderer
        .create(<KeyInformation keysInformation={keysInformation} />)
        .toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
