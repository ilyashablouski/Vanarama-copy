import React from 'react';
import { shallow } from 'enzyme';
import MediaCard from '../MediaCard/MediaCard';

describe('<MediaCard />', () => {
  it('Media Card should render correctly', () => {
    // ACT
    const wrapper = shallow(
      <MediaCard
        title={{ title: 'Media Card' }}
        media={{
          src: 'https://player.vimeo.com/video/263419265',
          responsive: true,
          className: 'media-player',
          width: '100%',
          height: '100%',
        }}
      />,
    );

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });
});
