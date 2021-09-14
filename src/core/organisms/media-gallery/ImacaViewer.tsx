import React, { useMemo, useState } from 'react';

import Icon from 'core/atoms/icon';
import ModalV2 from 'core/molecules/modal-v2';
import ImacaConfigurator from 'core/molecules/imaca-configurator';

import MoveCarIcon from 'core/assets/icons/MoveCar';
import FullScreenIcon from 'core/assets/icons/FullScreenIcon';
import ColorWheelIcon from 'core/assets/icons/ColorWheel';

function ImacaViewer() {
  const [isFullScreen, setFullScreen] = useState(false);
  const [isHintVisible, setHintVisible] = useState(true);
  const [isColorSelectionOpen, setColorSelectionOpen] = useState(false);

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

  const assets = useMemo(
    () => ({
      colors: [{ hex: '#ffffff' }],
      vehicleUrl: '',
      rimsUrl: '',
      tyresUrl: '',
    }),
    [],
  );

  return (
    <>
      <div className="imaca-viewer">
        <div className="imaca-viewer__inner">
          <ImacaConfigurator
            id="viewer"
            className="imaca-viewer__viewer"
            onMouseDown={handleImageDrag}
            assets={assets}
            width={1024}
            height={576}
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
          <button
            type="button"
            className="imaca-viewer__colours-toggle"
            onClick={handleColorsToggleClick}
          >
            <Icon
              className="imaca-viewer__icon"
              icon={<ColorWheelIcon />}
              color="dark"
              size="lead"
            />
            {isColorSelectionOpen ? 'Hide' : 'Select Colour'}
          </button>
          <button
            type="button"
            className="fullscreen-toggle"
            onClick={handleFullScreenClick}
          >
            <Icon
              className="fullscreen-toggle__icon"
              icon={<FullScreenIcon />}
              color="dark"
              size="lead"
            />
          </button>
        </div>
      </div>
      {isFullScreen && (
        <ModalV2 open onClose={handleFullScreenClick} color="secondary">
          <div className="imaca-viewer--fullscreen">
            <ImacaConfigurator
              id="fs-viewer"
              className="imaca-viewer__viewer"
              assets={assets}
              width={1366}
              height={768}
            />
          </div>
        </ModalV2>
      )}
    </>
  );
}

export default ImacaViewer;
