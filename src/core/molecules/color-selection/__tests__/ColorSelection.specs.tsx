import React from 'react';
import { mount } from 'enzyme';

import { factoryColorList, hotOfferColorList } from '../mocks';
import ColorSelection from '..';

describe('<ColorSelection />', () => {
  it('should renders correctly', () => {
    const tree = mount(
      <ColorSelection
        selectedColor={hotOfferColorList[0]}
        hotOfferColorList={hotOfferColorList}
        factoryColorList={factoryColorList}
        onChange={jest.fn}
      />,
    );
    expect(tree).toMatchSnapshot();
  });
});
