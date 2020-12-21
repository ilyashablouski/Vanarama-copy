import React, { FC } from 'react';
import cx from 'classnames';

import { ISearchFiltersHeadProps } from './interface';

const SearchFiltersHead: FC<ISearchFiltersHeadProps> = ({
  children,
  className,
  onClick = () => {},
}) => {
  return (
    <div
      className={cx('search-filters--title', className)}
      role="heading"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default SearchFiltersHead;
