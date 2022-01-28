import React from 'react';
import { render } from '@testing-library/react';
import SlideoutModal from '../SlideoutModal';

import { searchFilters, selectedFilters } from '../__fixtures__';

import { ISlideoutModalProps } from '../interfaces';

const getComponent = (props: ISlideoutModalProps) => (
  <SlideoutModal {...props} />
);

describe('<SlideoutModal />', () => {
  it('should render correctly with search filters', () => {
    // ACT
    const { container } = render(getComponent({ searchFilters }));

    // ASSERT
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with selected filters', () => {
    // ACT
    const container = render(getComponent({ searchFilters, selectedFilters }));

    // ASSERT
    expect(container).toMatchSnapshot();
  });
});
