import React, { FC } from 'react';

import Button from '../../atoms/button';
import ArrowBackSharp from '../../assets/icons/ArrowBackSharp';
import CheckmarkSharp from '../../assets/icons/CheckmarkSharp';

import { IPanelHeaderProps } from './interfaces';

const PanelHeader: FC<IPanelHeaderProps> = props => {
  const {
    panelId,
    label,
    setOpenPanel,
    searchFilters,
    selectedFilters,
    setSelectedFiltersState,
  } = props;

  const selectAll = () => {
    const all = [...searchFilters[panelId]];

    const selected = all.map(entry => entry.value);

    setSelectedFiltersState({
      ...selectedFilters,
      [panelId]: selected,
    });
  };

  const clearAll = () => {
    setSelectedFiltersState({
      ...selectedFilters,
      [panelId]: [],
    });
  };

  const showClearAll = () => {
    return (
      selectedFilters &&
      selectedFilters[panelId] &&
      selectedFilters[panelId].length === searchFilters[panelId].length
    );
  };

  const showAll = () => !showClearAll();

  const allowedAll = () =>
    ['bodyType', 'transmission', 'fuelType'].includes(panelId);

  return (
    <header className="slideout-modal--tile-header">
      <Button
        color="black"
        size="regular"
        fill="clear"
        label={label}
        icon={<ArrowBackSharp />}
        iconPosition="before"
        onClick={() => setOpenPanel(null)}
      />
      {allowedAll() && showClearAll() && (
        <Button
          color="dark"
          size="xsmall"
          fill="clear"
          label="Clear All"
          onClick={clearAll}
        />
      )}
      {allowedAll() && showAll() && (
        <Button
          color="dark"
          size="xsmall"
          fill="clear"
          label="All"
          icon={<CheckmarkSharp />}
          iconPosition="after"
          onClick={selectAll}
        />
      )}
    </header>
  );
};

export default React.memo(PanelHeader);
