import React, { useState, useEffect, useMemo } from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import cx from 'classnames';

import Icon from 'core/atoms/icon';
import Text from 'core/atoms/text';
import Media from 'core/atoms/media';
import Tabs from 'core/molecules/tabs';
import Tab from 'core/molecules/tabs/Tab';
import TabList from 'core/molecules/tabs/TabList';
import TabPanel from 'core/molecules/tabs/TabPanel';
import TabPanels from 'core/molecules/tabs/TabPanels';

import MediaVideo from 'core/assets/icons/MediaVideo';
import MediaRotate from 'core/assets/icons/MediaRotate';
import MediaPicture from 'core/assets/icons/MediaPicture';
import ColourPicker from 'core/assets/icons/ColourPicker';

import ColorWheelIcon from 'core/assets/icons/ColorWheel';

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
  toggleColorAndTrimModalVisible,
  isColourAndTrimOverlay,
}: IMediaGalleryProps) {
  const [activeTab, setActiveTab] = useState(activeTabIndex ?? 1);
  const [isOpenColourSelect, setIsOpenColourSelect] = useState(false);
  const shouldRenderImaca = useMemo(() => !!imacaAssets?.colours?.length, [
    imacaAssets,
  ]);

  useEffect(() => {
    const showVideoTab = window?.location?.hash === '#video';
    if (showVideoTab) {
      setActiveTab(2);
    }
  }, []);

  function handleChangeTab(index: number) {
    setIsOpenColourSelect(false);
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
            {shouldRenderImaca && (
              <TabPanel index={0}>
                <LazyLoadComponent
                  placeholder={<div className="imaca-viewer-placeholder" />}
                  visibleByDefault={isServerRenderOrAppleDevice}
                >
                  <ImacaViewer
                    isOpenColourSelect={isOpenColourSelect}
                    colour={colour}
                    setColour={setColour}
                    assets={imacaAssets!}
                    upscaleCanvas={isCar}
                    imacaConfiguratorId="main-viewer"
                  />
                </LazyLoadComponent>
              </TabPanel>
            )}
            <TabPanel index={1}>
              <ImageCarousel
                images={images}
                imageAltText={imageAltText}
                renderImageDecoration={() =>
                  shouldRenderImaca &&
                  !isColourAndTrimOverlay && (
                    <button
                      type="button"
                      className="gallery-select-color-btn"
                      onClick={() => {
                        setIsOpenColourSelect(true);
                        setActiveTab(0);
                      }}
                    >
                      <Icon
                        className="colours-toggle__icon"
                        icon={<ColorWheelIcon />}
                        color="dark"
                        size="lead"
                      />
                      <Text dataUiTestId="details-page_text_select-colour">
                        Select Colour
                      </Text>
                    </button>
                  )
                }
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
          <TabList
            className={cx('media-gallery__tabs', {
              'with-colour-picker': isColourAndTrimOverlay,
            })}
          >
            {shouldRenderImaca && (
              <Tab index={0} dataUiTestId="details-page_tab_360">
                <Icon className="rotate" icon={<MediaRotate />} />
                360°
              </Tab>
            )}
            <Tab index={1} dataUiTestId="details-page_tab_Photos">
              <Icon className="picture" icon={<MediaPicture />} />
              Photos
            </Tab>
            {isColourAndTrimOverlay && (
              <Tab
                index={3}
                dataUiTestId="details-page_tab_Colour"
                onClick={toggleColorAndTrimModalVisible}
              >
                <Icon
                  className="color-picker uncolored"
                  icon={<ColourPicker />}
                />
                Select Colour
              </Tab>
            )}
            {videoSrc && (
              <Tab index={2} dataUiTestId="details-page_tab_Video">
                <Icon className="video" icon={<MediaVideo />} />
                Video
              </Tab>
            )}
          </TabList>
        </Tabs>
      </div>
      {!shouldRenderImaca && (
        <span className="caveat-text text -small -darker">
          Photos are for illustration purposes only.
        </span>
      )}
    </>
  );
}

export default MediaGallery;
