import React, { FC } from 'react';
import cx from 'classnames';
import Button from '../../atoms/button';
import CloseSharp from '../../assets/icons/CloseSharp';

import { ISearchFilterTagsProps } from './interface';

const SearchFilterTags: FC<ISearchFilterTagsProps> = ({
  className,
  selectedFilters = [],
  onClearAll,
  onRemove,
  dataTestId,
  dataUiTestId,
}) => {
  return (
    <div className={cx('search-filters--tags', className)}>
      {selectedFilters
        .sort(
          (firstFilter, secondFilter) => firstFilter.order - secondFilter.order,
        )
        .map(selected => {
          return (
            <Button
              key={selected.value}
              color="teal"
              size="xsmall"
              fill="outline"
              icon={<CloseSharp />}
              iconPosition="after"
              label={
                selected.value.charAt(0).toUpperCase() + selected.value.slice(1)
              }
              id={selected.value}
              data-testid={dataTestId}
              onClick={event => {
                if (onRemove) {
                  onRemove(event);
                }
              }}
              dataUiTestId={`${dataUiTestId}_selected-filters-tag_button_${selected.value}`}
            />
          );
        })}
      {selectedFilters.length > 1 && (
        <Button
          onClick={() => {
            if (onClearAll) {
              onClearAll();
            }
          }}
          color="teal"
          size="xsmall"
          fill="solid"
          label="Clear All"
          id="clearAllButton"
          dataUiTestId={`${dataUiTestId}_selected-filters_button_clear-all`}
        />
      )}
    </div>
  );
};

export default SearchFilterTags;
