import React, { FC } from 'react';

import Button from '../../atoms/button';
import OptionsSharp from '../../assets/icons/OptionsSharp';

import NavItem from './NavItem';

import { IPanelMainMenu } from './interfaces';

import panelsData from './panelsData';

const PanelMainMenu: FC<IPanelMainMenu> = props => {
  const { searchFilters, selectedFilters } = props;

  const setSelected = (key: string) => {
    if (!selectedFilters?.[key]) return null;

    const selected = searchFilters[key]
      .map(filter => {
        if (selectedFilters[key].includes(filter.value)) return filter.label;
        return null;
      })
      .filter(el => el != null);

    return selected;
  };

  return (
    <>
      <header className="slideout-modal--tile-header">
        <Button
          color="black"
          size="regular"
          fill="clear"
          icon={<OptionsSharp />}
          iconPosition="before"
          label="Filters"
        />
      </header>

      <div className="slideout-modal--tile-content">
        <nav className="slideout-modal--nav">
          {Object.keys(panelsData).map(key => {
            const selected = panelsData[
              key
            ].filterIds?.map((filterId: string) => setSelected(filterId));

            return (
              <NavItem
                key={key}
                label={panelsData[key].label}
                selected={selected
                  ?.flat()
                  .filter(
                    (el): el is string =>
                      el !== null && typeof el !== 'undefined',
                  )}
                onClick={() => props.setOpenPanel(panelsData[key].panelId)}
              />
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default React.memo(PanelMainMenu);
