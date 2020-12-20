import React, { FC } from 'react';
import cx from 'classnames';
import { ISearchFiltersProps } from './interface';

const SearchFilters: FC<ISearchFiltersProps> = React.memo(
  ({ children, className, isOpen = true }) => {
    return (
      <div className={cx('search-filters', { '-open': isOpen }, className)}>
        {children}
      </div>
    );
  },
);

export default SearchFilters;
