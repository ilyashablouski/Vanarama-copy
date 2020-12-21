import React, { FC } from 'react';

import PanelHeader from './PanelHeader';
import PanelBody from './PanelBody';

import { IPanelProps } from './interfaces';

import panelsData from './panelsData';

const Panel: FC<IPanelProps> = props => {
  const {
    panelId,
    setOpenPanel,
    searchFilters,
    selectedFilters,
    setSelectedFiltersState,
  } = props;

  return (
    <>
      <PanelHeader
        panelId={panelsData[panelId].panelId}
        setOpenPanel={setOpenPanel}
        label={panelsData[panelId].label}
        selectedFilters={selectedFilters}
        searchFilters={searchFilters}
        setSelectedFiltersState={setSelectedFiltersState}
      />
      <PanelBody
        panelId={panelsData[panelId].panelId}
        searchFilters={searchFilters}
        selectedFilters={selectedFilters}
        setSelectedFiltersState={setSelectedFiltersState}
      />
    </>
  );
};

export default React.memo(Panel);
