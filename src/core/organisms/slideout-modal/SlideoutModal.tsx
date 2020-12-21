import React, { FC, useState } from 'react';
import cx from 'classnames';

import Button from '../../atoms/button';
import Icon from '../../atoms/icon';
import Tile from '../../molecules/tile';

import PanelMainMenu from './PanelMainMenu';
import Panel from './Panel';

import OptionsSharp from '../../assets/icons/OptionsSharp';
import CloseSharp from '../../assets/icons/CloseSharp';

import { ISlideoutModalProps } from './interfaces';

const SlideoutModal: FC<ISlideoutModalProps> = props => {
  const {
    className,
    isOpen = false,
    openPanel = null,
    searchFilters,
    selectedFilters,
  } = props;
  const [isOpenState, setIsOpenState] = useState(isOpen);
  const [openPanelState, setOpenPanelState] = useState(openPanel);
  const [selectedFiltersState, setSelectedFiltersState] = useState(
    selectedFilters || {},
  );

  return (
    <div className={cx('slideout-modal-wrapper', className)}>
      {/* Open */}
      <Button
        id="openFilterButton"
        color="teal"
        size="lead"
        fill="solid"
        className="slideout-modal--trigger"
        type="button"
        icon={<OptionsSharp />}
        iconPosition="before"
        label="Filters"
        onClick={() => setIsOpenState(true)}
      />
      {isOpenState && (
        <div className="slideout-modal">
          {/* Close */}
          <Button
            id="closeFilterButton"
            className="slideout-modal--close"
            iconColor="white"
            size="large"
            label={<Icon color="white" icon={<CloseSharp />} />}
            onClick={() => setIsOpenState(false)}
          />
          <Tile className="slideout-modal--tile">
            {openPanelState ? (
              // Filter panel.
              <Panel
                setOpenPanel={setOpenPanelState}
                panelId={openPanelState}
                searchFilters={searchFilters}
                selectedFilters={selectedFiltersState}
                setSelectedFiltersState={setSelectedFiltersState}
              />
            ) : (
              // Main filter menu.
              <PanelMainMenu
                setOpenPanel={setOpenPanelState}
                searchFilters={searchFilters}
                selectedFilters={selectedFiltersState}
              />
            )}

            <footer className="slideout-modal--tile-footer">
              {/* Results */}
              <Button
                color="teal"
                size="regular"
                fill="solid"
                className="slideout-modal--tile-footer-button"
                label="View Results"
                onClick={() => setIsOpenState(false)}
              />
            </footer>
          </Tile>
        </div>
      )}
    </div>
  );
};

export default React.memo(SlideoutModal);
