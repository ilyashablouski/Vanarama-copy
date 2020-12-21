import React, { FC } from 'react';

import { FilterMakeAndModel, FilterBudget, FilterCheckboxes } from './filters';

import { IPanelBody } from './interfaces';

const PanelBody: FC<IPanelBody> = props => {
  const {
    panelId,
    searchFilters,
    selectedFilters,
    setSelectedFiltersState,
  } = props;

  const filterSelect = () => {
    let FilterPanel;
    switch (panelId) {
      case 'makeAndModel':
        FilterPanel = FilterMakeAndModel;
        break;
      case 'budget':
        FilterPanel = FilterBudget;
        break;
      case 'bodyType':
      case 'transmission':
      case 'fuelType':
        FilterPanel = FilterCheckboxes;
        break;
      default:
        return <span>Wrong Filter</span>;
    }
    return (
      <FilterPanel
        name={panelId}
        searchFilters={searchFilters}
        selectedFilters={selectedFilters}
        setSelectedFiltersState={setSelectedFiltersState}
      />
    );
  };

  return (
    <div className="slideout-modal--tile-content">
      <nav className="slideout-modal--nav">{filterSelect()}</nav>
    </div>
  );
};

export default React.memo(PanelBody);
