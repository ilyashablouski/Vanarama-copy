import React, { useMemo, useState } from 'react';

import Icon from 'core/atoms/icon';
import ModalV2 from 'core/molecules/modal-v2';
import ColorSelection from 'core/molecules/color-selection';
import ImacaConfigurator from 'core/molecules/imaca-configurator';

import MoveCarIcon from 'core/assets/icons/MoveCar';
import FullScreenIcon from 'core/assets/icons/FullScreenIcon';
import ColorWheelIcon from 'core/assets/icons/ColorWheel';

import { IImacaViewer } from './interfaces';

function ImacaViewer({ assets, colour, setColour }: IImacaViewer) {
  const [isFullScreen, setFullScreen] = useState(false);
  const [isHintVisible, setHintVisible] = useState(true);
  const [isColorSelectionOpen, setColorSelectionOpen] = useState(false);

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
        <div className="imaca-viewer__inner">
          <div className="imaca-viewer__viewer">
            <ImacaConfigurator
              id="viewer"
              className="imaca-viewer__configurator"
              onMouseDown={handleImageDrag}
              selectedColour={selectedColor?.hex}
              assets={assets}
              width={1420}
              height={800}
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
          <div className="imaca-viewer__controls">
            {assets.colours?.length ? (
              <button
                type="button"
                className="colours-toggle imaca-viewer__colours-toggle"
                onClick={handleColorsToggleClick}
              >
                <Icon
                  className="colours-toggle__icon"
                  icon={<ColorWheelIcon />}
                  color="dark"
                  size="lead"
                />
                {isColorSelectionOpen ? 'Hide' : 'Select Colour'}
              </button>
            ) : null}
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
        </div>
        {assets.colours?.length
          ? isColorSelectionOpen && (
              <ColorSelection
                className="imaca-viewer__color-selection"
                selectedColor={selectedColor ?? assets.colours[0]}
                hotOfferColorList={hotOffersColorList}
                factoryColorList={factoryColorList}
                onChange={color => setColour(color.capId)}
              />
            )
          : null}
      </div>
      {isFullScreen && (
        <ModalV2 open onClose={handleFullScreenClick} color="secondary">
          <div className="imaca-viewer--fs">
            <ImacaConfigurator
              id="fs-viewer"
              className="imaca-viewer__configurator"
              onMouseDown={handleImageDrag}
              selectedColour={selectedColor?.hex}
              assets={assets}
              width={1420}
              height={800}
            />
          </div>
        </ModalV2>
      )}
    </>
  );
}

export default ImacaViewer;
