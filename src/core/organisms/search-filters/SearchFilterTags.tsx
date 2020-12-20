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
      {selectedFilters.map(val => {
        return (
          <Button
            key={val}
            color="teal"
            size="xsmall"
            fill="outline"
            icon={<CloseSharp />}
            iconPosition="after"
            label={val}
            id={val}
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
