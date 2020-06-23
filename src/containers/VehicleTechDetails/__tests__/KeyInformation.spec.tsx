import React from 'react';
import renderer from 'react-test-renderer';
import KeyInformation from '../KeyInformation';

describe('<KeyInformation />', () => {
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
