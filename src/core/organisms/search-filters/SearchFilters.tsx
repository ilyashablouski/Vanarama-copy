import React, { FC } from 'react';
import cx from 'classnames';
import { ISearchFiltersProps } from './interface';

const SearchFilters: FC<ISearchFiltersProps> = React.memo(
  ({ children, className, isOpen = true, dataUiTestId }) => {
    return (
      <div
        className={cx('search-filters', { '-open': isOpen }, className)}
        data-uitestid={
          dataUiTestId ? `${dataUiTestId}_div_search-filters` : undefined
        }
      >
        {children}
      </div>
    );
  },
);

export default SearchFilters;
