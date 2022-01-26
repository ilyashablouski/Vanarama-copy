import * as React from 'react';
import { render } from '@testing-library/react';
import Search from '../Search';

import { ISearchProps } from '../interfaces';

const getComponent = (props: ISearchProps) => <Search {...props} />;

describe('<Search/>', () => {
  it('renders default state correctly', () => {
    const { container } = render(getComponent({}));
    expect(container).toMatchSnapshot();
  });

  it('renders Intermediate state correctly ', () => {
    const { container } = render(getComponent({ isIntermediateState: true }));
    expect(container).toMatchSnapshot();
  });
  // TODO: fix test
  it('should contain defined handler and id props on input el', () => {
    // const handler = jest.fn();
    //
    // const props = render(
    //   getComponent({
    //     id: 'testInput',
    //     onChange: handler,
    //   }),
    // )
    //   .getElementsByClassName('search-input')
    //   .first()
    //   .props();
    //
    // expect(props.onChange).toEqual(expect.any(Function));
    // expect(props.id).toEqual('testInput');
  });
  // TODO: fix test
  it('should pass event object with value to handler onChange', () => {
    // const handler = jest.fn();
    // const { container } = render(getComponent({ onChange: handler }));
    // const event = { target: { value: 'newVal' } };
    //
    // container.querySelector('input')?.onchange?.(event as any);
    //
    // expect(handler).toBeCalledWith(
    //   expect.objectContaining({ target: { value: 'newVal' } }),
    // );
  });
});
