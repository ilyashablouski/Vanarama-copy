import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import Media from '..';

describe('<Media />', () => {
  it('renders correctly with default prop', () => {
    const wrapper = render(
      <Media src="https://player.vimeo.com/video/263419265" />,
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('renders correctly with className', () => {
    const wrapper = render(
      <Media
        src="https://player.vimeo.com/video/263419265"
        className="hello-world"
        player
      />,
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('renders correctly with config', () => {
    const wrapper = render(
      <Media
        src="https://player.vimeo.com/video/263419265"
        vimeoConfig={{ color: 'EC6408', portrait: false }}
        player
      />,
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('renders correctly with data-testid', () => {
    const wrapper = render(
      <Media
        src="https://player.vimeo.com/video/263419265"
        dataTestId="helloWorld"
        player
      />,
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  it('renders correctly with iframe and responsive', () => {
    const wrapper = render(
      <Media
        src="https://ssl.caranddriving.com/cdwebsite/player.aspx?id=8221&cid=autorama&responsive=true"
        dataTestId="helloWorld"
        responsive
        player
      />,
    );
    expect(wrapper.container).toMatchSnapshot();
  });
  it('renders youtube player correctly after click on thumb', () => {
    const wrapper = render(
      <Media
        src="https://www.youtube.com/embed/hZVXqcKEBmQ"
        dataTestId="helloWorld"
        width="100%"
        height="360px"
      />,
    );
    fireEvent.click(wrapper.container.getElementsByClassName('play-btn')[0]);
    expect(wrapper.container).toMatchSnapshot();
  });

  it('renders youtube thumb correctly', () => {
    const wrapper = render(
      <Media
        src="https://www.youtube.com/embed/hZVXqcKEBmQ"
        dataTestId="helloWorld"
        width="100%"
        height="360px"
      />,
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
