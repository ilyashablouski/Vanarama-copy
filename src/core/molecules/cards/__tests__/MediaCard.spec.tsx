import React from 'react';
import { render } from '@testing-library/react';
import MediaCard from '../MediaCard/MediaCard';

describe('<MediaCard />', () => {
  it('Media Card should render correctly', () => {
    // ACT
    const wrapper = render(
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
    expect(wrapper.container).toMatchSnapshot();
  });
});
