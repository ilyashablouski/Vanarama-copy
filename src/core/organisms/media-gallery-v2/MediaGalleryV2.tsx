import React, { useState, useEffect } from 'react';
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Media from 'core/atoms/media';
import Tabs from 'core/molecules/tabs';
import Tab from 'core/molecules/tabs/Tab';
import TabList from 'core/molecules/tabs/TabList';
import TabPanel from 'core/molecules/tabs/TabPanel';
import TabPanels from 'core/molecules/tabs/TabPanels';

import { IMediaGalleryV2Props } from './interfaces';

SwiperCore.use([Pagination]);

function MediaGalleryV2({
  images,
  vimeoConfig = {},
  videoSrc,
  flag,
  threeSixtyVideoSrc,
  videoIframe,
  activeTabIndex,
  imageAltText,
}: IMediaGalleryV2Props) {
  const [activeTab, setActiveTab] = useState(activeTabIndex ?? 0);

  useEffect(() => {
    const showVideoTab = window?.location?.hash === '#video';
    if (showVideoTab) {
      setActiveTab(2);
    }
  }, []);

  function handleChangeTab(index: number) {
    setActiveTab(index);
  }

  return (
    <>
      <div className="pdp--flag">
        <div>
          <span>{flag.text}</span>
        </div>
        {flag.accentIcon && flag.accentText && (
          <div>
            {flag.accentIcon}
            <span>{flag.accentText}</span>
          </div>
        )}
      </div>
      <Tabs activeIndex={activeTab} onChange={index => handleChangeTab(index)}>
        <TabPanels className="-pt-000">
          {threeSixtyVideoSrc && (
            <TabPanel index={0}>
              <Media
                className="media-player"
                src={threeSixtyVideoSrc}
                vimeoConfig={vimeoConfig}
                responsive
                width="100%"
                height="100%"
                player={!videoIframe}
              />
            </TabPanel>
          )}
          <TabPanel index={1}>
            <Swiper>
              {images.map(image => (
                <SwiperSlide>
                  <img src={image} alt={imageAltText} />
                </SwiperSlide>
              ))}
            </Swiper>
          </TabPanel>
          {videoSrc && (
            <TabPanel index={2}>
              <Media
                src={videoSrc}
                vimeoConfig={vimeoConfig}
                responsive
                width="100%"
                height="100%"
                className="media-player"
                player={!videoIframe}
              />
            </TabPanel>
          )}
        </TabPanels>
        <TabList>
          {threeSixtyVideoSrc && <Tab index={0}>360° View</Tab>}
          <Tab index={1}>Photos</Tab>
          {videoSrc && <Tab index={2}>Videos</Tab>}
        </TabList>
      </Tabs>
      <span className="caveat-text text -small -darker">
        Photos are for illustration purposes only.
      </span>
    </>
  );
}

export default MediaGalleryV2;
