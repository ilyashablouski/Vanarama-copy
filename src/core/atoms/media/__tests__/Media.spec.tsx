import React from 'react';
import { shallow } from 'enzyme';

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
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with config', () => {
    const wrapper = shallow(
      <Media
        src="https://player.vimeo.com/video/263419265"
        vimeoConfig={{ color: 'EC6408', portrait: false }}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with data-testid', () => {
    const wrapper = shallow(
      <Media
        src="https://player.vimeo.com/video/263419265"
        dataTestId="helloWorld"
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
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
