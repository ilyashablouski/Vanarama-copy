import React, { useState, useEffect } from 'react';
import cx from 'classnames';

import Media from 'core/atoms/media';
import Tabs from 'core/molecules/tabs';
import Tab from 'core/molecules/tabs/Tab';
import TabList from 'core/molecules/tabs/TabList';
import TabPanel from 'core/molecules/tabs/TabPanel';
import TabPanels from 'core/molecules/tabs/TabPanels';

import ImageCarousel from './ImageCarousel';

import { IMediaGalleryV2Props } from './interfaces';

function MediaGalleryV2({
  images,
  vimeoConfig = {},
  videoSrc,
  flag,
  threeSixtyVideoSrc,
  videoIframe,
  activeTabIndex,
  imageAltText,
  className,
}: IMediaGalleryV2Props) {
  const [activeTab, setActiveTab] = useState(activeTabIndex ?? 1);

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
        <span>{flag.text}</span>
        {flag.accentIcon && flag.accentText && (
          <div>
            {flag.accentIcon}
            <span>{flag.accentText}</span>
          </div>
        )}
      </div>
      <div className={cx('media-gallery-v2', className)}>
        <Tabs activeIndex={activeTab} size="large" onChange={handleChangeTab}>
          <TabPanels className="media-gallery-v2__content">
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
              <ImageCarousel images={images} imageAltText={imageAltText} />
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
          <TabList className="media-gallery-v2__tabs">
            {threeSixtyVideoSrc && <Tab index={0}>360°</Tab>}
            <Tab index={1}>Photos</Tab>
            {videoSrc && <Tab index={2}>Videos</Tab>}
          </TabList>
        </Tabs>
      </div>
      <span className="caveat-text text -small -darker">
        Photos are for illustration purposes only.
      </span>
    </>
  );
}

export default MediaGalleryV2;
