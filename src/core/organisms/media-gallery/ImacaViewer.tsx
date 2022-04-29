import React, { useEffect, useMemo, useState } from 'react';
import cx from 'classnames';

import Icon from 'core/atoms/icon';
import Text from 'core/atoms/text';
import ModalV2 from 'core/molecules/modal-v2';
import ColorSelection from 'core/molecules/color-selection';
import ImacaConfigurator from 'core/molecules/imaca-configurator';

import MoveCarIcon from 'core/assets/icons/MoveCar';
import FullScreenIcon from 'core/assets/icons/FullScreenIcon';
import ColorWheelIcon from 'core/assets/icons/ColorWheel';

import { useMobileViewport } from '../../../hooks/useMediaQuery';

import { IImacaViewer } from './interfaces';

const Disclaimer = () => (
  <Text
    tag="p"
    size="regular"
    color="black"
    className="imaca-viewer__disclaimer"
  >
    The trim &amp; wheels are for illustration purposes only. For exact trim see
    full spec below.
  </Text>
);

function ImacaViewer({
  assets,
  colour,
  changeColour,
  upscaleCanvas,
  isOpenColourSelect,
  isColourSelectorVisible = true,
  isDisclaimerVisible = true,
  imacaConfiguratorId,
}: IImacaViewer) {
  const [isFullScreen, setFullScreen] = useState(false);
  const [isHintVisible, setHintVisible] = useState(true);
  const [isColorSelectionOpen, setColorSelectionOpen] = useState(
    isOpenColourSelect || false,
  );

  useEffect(() => {
    if (isOpenColourSelect) {
      setColorSelectionOpen(isOpenColourSelect);
    }
  }, [isOpenColourSelect]);

  const isMobileLayout = useMobileViewport();

  const hotOffersColorList = useMemo(
    () => assets.colours?.filter(item => item.onOffer),
    [assets.colours],
  );
  const factoryColorList = useMemo(
    () => assets.colours?.filter(item => !item.onOffer),
    [assets.colours],
  );
  const selectedColor = useMemo(
    () => assets.colours?.find(item => colour === item.capId),
    [assets.colours, colour],
  );

  function handleFullScreenClick() {
    setFullScreen(!isFullScreen);
  }

  function handleColorsToggleClick() {
    setColorSelectionOpen(!isColorSelectionOpen);
  }

  function handleImageDrag() {
    if (isHintVisible) {
      setHintVisible(false);
    }
  }

  return (
    <>
      <div className="imaca-viewer">
        <div className="imaca-viewer__container">
          <div className="imaca-viewer__inner">
            <div className="imaca-viewer__viewer">
              <ImacaConfigurator
                id={imacaConfiguratorId}
                width={1420}
                height={798}
                assets={assets}
                onMouseDown={handleImageDrag}
                onTouchStart={handleImageDrag}
                selectedColour={selectedColor?.hex}
                className={cx('imaca-viewer__configurator', {
                  '-upscale': upscaleCanvas,
                })}
              />
              {isHintVisible && (
                <div className="imaca-viewer__hint">
                  <Icon
                    className="imaca-viewer__icon"
                    icon={<MoveCarIcon />}
                    color="white"
                    size="lead"
                  />
                  Drag the image
                </div>
              )}
            </div>
            {isMobileLayout && isDisclaimerVisible && <Disclaimer />}
            {isColourSelectorVisible && (
              <div className="imaca-viewer__controls">
                <button
                  type="button"
                  className="colours-toggle imaca-viewer__colours-toggle"
                  onClick={handleColorsToggleClick}
                  data-uitestid={`details-page_imaca-viewer_button_colours-toggle_${
                    isColorSelectionOpen ? 'hide' : 'select-colour'
                  }`}
                >
                  <Icon
                    className="colours-toggle__icon"
                    icon={<ColorWheelIcon />}
                    color="dark"
                    size="lead"
                  />
                  {isColorSelectionOpen ? 'Hide' : 'Select Colour'}
                </button>
                <button
                  type="button"
                  className="fs-toggle imaca-viewer__fs-toggle"
                  onClick={handleFullScreenClick}
                >
                  <Icon
                    className="fs-toggle__icon"
                    icon={<FullScreenIcon />}
                    color="dark"
                    size="lead"
                  />
                </button>
              </div>
            )}
          </div>
          {!isMobileLayout && isDisclaimerVisible && <Disclaimer />}
        </div>
        {isColorSelectionOpen && isColourSelectorVisible && (
          <ColorSelection
            className="imaca-viewer__color-selection"
            selectedColor={selectedColor}
            hotOfferColorList={hotOffersColorList}
            factoryColorList={factoryColorList}
            changeColour={changeColour}
          />
        )}
      </div>
      {isFullScreen && (
        <ModalV2
          open
          className="imaca-viewer--fs"
          onClose={handleFullScreenClick}
          color="secondary"
        >
          <div className="imaca-viewer__container">
            <ImacaConfigurator
              id="fs-viewer"
              width={1420}
              height={798}
              assets={assets}
              onMouseDown={handleImageDrag}
              onTouchStart={handleImageDrag}
              selectedColour={selectedColor?.hex}
              className={cx('imaca-viewer__configurator', {
                '-upscale': upscaleCanvas,
              })}
            />
            <Disclaimer />
          </div>
        </ModalV2>
      )}
    </>
  );
}

export default ImacaViewer;
