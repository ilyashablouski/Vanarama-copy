import React from 'react';
import { mount, shallow } from 'enzyme';

import Media from '..';

describe('<Media />', () => {
  it('renders correctly with default prop', () => {
    const wrapper = shallow(
      <Media src="https://player.vimeo.com/video/263419265" />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with className', () => {
    const wrapper = shallow(
      <Media
        src="https://player.vimeo.com/video/263419265"
        className="hello-world"
        player
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with config', () => {
    const wrapper = shallow(
      <Media
        src="https://player.vimeo.com/video/263419265"
        vimeoConfig={{ color: 'EC6408', portrait: false }}
        player
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with data-testid', () => {
    const wrapper = shallow(
      <Media
        src="https://player.vimeo.com/video/263419265"
        dataTestId="helloWorld"
        player
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with iframe and responsive', () => {
    const wrapper = shallow(
      <Media
        src="https://ssl.caranddriving.com/cdwebsite/player.aspx?id=8221&cid=autorama&responsive=true"
        dataTestId="helloWorld"
        responsive
        player
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('renders youtube player correctly after click on thumb', () => {
    const wrapper = mount(
      <Media
        src="https://www.youtube.com/watch?v=hZVXqcKEBmQ"
        dataTestId="helloWorld"
        width="100%"
        height="360px"
      />,
    );
    wrapper.find('.play-btn').simulate('click');
    expect(wrapper).toMatchSnapshot();
  });

  it('renders youtube thumb correctly', () => {
    const wrapper = mount(
      <Media
        src="https://www.youtube.com/watch?v=hZVXqcKEBmQ"
        dataTestId="helloWorld"
        width="100%"
        height="360px"
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
