import React from 'react';
import { render } from '@testing-library/react';

import { factoryColorList, hotOfferColorList } from '../mocks';
import ColorSelection from '..';

describe('<ColorSelection />', () => {
  it('should renders correctly', () => {
    const tree = render(
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
