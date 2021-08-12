import React, { FC, memo, useState, useEffect } from 'react';
import { IMediaGalleryProps } from './interfaces';
import Tabs from '../../molecules/tabs';
import TabList from '../../molecules/tabs/TabList';
import Tab from '../../molecules/tabs/Tab';
import TabPanels from '../../molecules/tabs/TabPanels';

import TabPanel from '../../molecules/tabs/TabPanel';
import Media from '../../atoms/media';
import ImageCarousel from './ImageCarousel';

const MediaGallery: FC<IMediaGalleryProps> = memo(props => {
  const {
    images,
    presetSlide = 0,
    vimeoConfig = {},
    videoSrc,
    flag,
    threeSixtyVideoSrc,
    videoIframe,
    activeTabIndex,
    imageAltText,
  } = props;
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTab, setActiveTab] = useState(activeTabIndex || 1);

  useEffect(() => {
    const showVideoTab = window?.location?.hash === '#video';
    if (showVideoTab) {
      setActiveTab(2);
    }
  }, []);

  // if we have preset slide assign value for actual
  useEffect(() => {
    setActiveSlide(presetSlide);
  }, [setActiveSlide, presetSlide]);

  const onChangeTab = (index: number) => {
    // reset active slide to 0 after changing tab
    if (index === 1) {
      setActiveSlide(0);
    }
    setActiveTab(index);
  };

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

      <Tabs activeIndex={activeTab} onChange={index => onChangeTab(index)}>
        <TabPanels className="-pt-000">
          <TabPanel index={1}>
            <ImageCarousel
              images={images}
              activeSlide={activeSlide}
              changeSlideHandler={setActiveSlide}
              imageAltText={imageAltText}
              // TODO: Should be uncommented in the future when we are going to use product card banners.
              // renderImageDecoration={(image, index) =>
              //   index === 0 ? (
              //     <div className="gallery-promotion-container">
              //       {showElectricBanner && <ElectricVehicleBanner />}
              //       {showInsuranceBanner && <FreeInsuranceBanner />}
              //     </div>
              //   ) : null
              // }
            />
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
          {threeSixtyVideoSrc && (
            <TabPanel index={3}>
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
        </TabPanels>
        <TabList>
          <Tab index={1}>Photos</Tab>
          {videoSrc && <Tab index={2}>Videos</Tab>}
          {threeSixtyVideoSrc && <Tab index={3}>360° View</Tab>}
        </TabList>
      </Tabs>
      <span className="caveat-text text -small -darker">
        Photos are for illustration purposes only.
      </span>
    </>
  );
});

export default MediaGallery;
