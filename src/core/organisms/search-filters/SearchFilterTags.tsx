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
}) => {
  return (
    <div className={cx('search-filters--tags', className)}>
      {selectedFilters
        .sort((a, b) => a.order - b.order)
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
              onClick={e => {
                if (onRemove) onRemove(e);
              }}
            />
          );
        })}
      {selectedFilters.length > 1 && (
        <Button
          onClick={() => {
            if (onClearAll) onClearAll();
          }}
          color="teal"
          size="xsmall"
          fill="solid"
          label="Clear All"
          id="clearAllButton"
        />
      )}
    </div>
  );
};

export default SearchFilterTags;
