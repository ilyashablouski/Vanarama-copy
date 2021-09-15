import React from 'react';
import { mount } from 'enzyme';

import { factoryColorList, hotOfferColorList } from '../mocks';
import ColorSelection from '..';

describe('<ColorSelection />', () => {
  it('should renders correctly', () => {
    const tree = mount(
      <ColorSelection
        selectedColorId={97341}
        hotOfferColorList={hotOfferColorList}
        factoryColorList={factoryColorList}
        onChange={jest.fn}
      />,
    );
    expect(tree).toMatchSnapshot();
  });
});
