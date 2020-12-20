import * as React from 'react';
import { mount, shallow } from 'enzyme';
import Search from '../Search';

import { ISearchProps } from '../interfaces';

const getComponent = (props: ISearchProps) => <Search {...props} />;

describe('<Search/>', () => {
  it('renders default state correctly', () => {
    const shallowWrap = shallow(getComponent({}));
    expect(shallowWrap).toMatchSnapshot();
  });

  it('renders Intermediate state correctly ', () => {
    const shallowWrap = shallow(getComponent({ isIntermediateState: true }));
    expect(shallowWrap).toMatchSnapshot();
  });

  it('should contain defined handler and id props on input el', () => {
    const handler = jest.fn();

    const props = shallow(
      getComponent({
        id: 'testInput',
        onChange: handler,
      }),
    )
      .find('.search-input')
      .first()
      .props();

    expect(props.onChange).toEqual(expect.any(Function));
    expect(props.id).toEqual('testInput');
  });

  it('should pass event object with value to handler onChange', () => {
    const handler = jest.fn();
    const mountWrap = mount(getComponent({ onChange: handler }));
    const event = { target: { value: 'newVal' } };

    mountWrap.find('input').simulate('change', event);

    expect(handler).toBeCalledWith(
      expect.objectContaining({ target: { value: 'newVal' } }),
    );
  });
});
