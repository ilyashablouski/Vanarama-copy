import React, { useState, useEffect } from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import cx from 'classnames';

import Icon from 'core/atoms/icon';
import Media from 'core/atoms/media';
import Tabs from 'core/molecules/tabs';
import Tab from 'core/molecules/tabs/Tab';
import TabList from 'core/molecules/tabs/TabList';
import TabPanel from 'core/molecules/tabs/TabPanel';
import TabPanels from 'core/molecules/tabs/TabPanels';

import MediaVideo from 'core/assets/icons/MediaVideo';
import MediaRotate from 'core/assets/icons/MediaRotate';
import MediaPicture from 'core/assets/icons/MediaPicture';

import { isServerRenderOrAppleDevice } from '../../../utils/deviceType';
import { IMediaGalleryProps } from './interfaces';

import ImacaViewer from './ImacaViewer';
import ImageCarousel from './ImageCarousel';

function MediaGallery({
  isCar,
  images,
  vimeoConfig = {},
  videoSrc,
  flag,
  videoIframe,
  activeTabIndex,
  imageAltText,
  imacaAssets,
  colour,
  setColour,
  className,
}: IMediaGalleryProps) {
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
      <div className={cx('media-gallery', className)}>
        <Tabs activeIndex={activeTab} size="large" onChange={handleChangeTab}>
          <TabPanels className="media-gallery__content">
            {imacaAssets && (
              <TabPanel index={0}>
                <LazyLoadComponent
                  placeholder={<div className="imaca-viewer-placeholder" />}
                  visibleByDefault={isServerRenderOrAppleDevice}
                >
                  <ImacaViewer
                    colour={colour}
                    setColour={setColour}
                    assets={imacaAssets}
                    upscaleCanvas={isCar}
                  />
                </LazyLoadComponent>
              </TabPanel>
            )}
            <TabPanel index={1}>
              <ImageCarousel
                images={images}
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
          </TabPanels>
          <TabList className="media-gallery__tabs">
            {imacaAssets && (
              <Tab index={0}>
                <Icon className="rotate" icon={<MediaRotate />} />
                360°
              </Tab>
            )}
            <Tab index={1}>
              <Icon className="picture" icon={<MediaPicture />} />
              Photos
            </Tab>
            {videoSrc && (
              <Tab index={2}>
                <Icon className="video" icon={<MediaVideo />} />
                Video
              </Tab>
            )}
          </TabList>
        </Tabs>
      </div>
      {!imacaAssets && (
        <span className="caveat-text text -small -darker">
          Photos are for illustration purposes only.
        </span>
      )}
    </>
  );
}

export default MediaGallery;
