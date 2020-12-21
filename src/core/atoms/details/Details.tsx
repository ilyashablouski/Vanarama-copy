import React, { FC, memo } from 'react';
import cx from 'classnames';

import { IDetailsProps } from './interfaces';

const Details: FC<IDetailsProps> = memo(props => {
  const { className, children, summary, open } = props;

  return (
    <details className={cx('details', className)} open={open}>
      <summary className="details--summary">{summary}</summary>
      <div className="details--content">{children}</div>
    </details>
  );
});

Details.displayName = 'Details';

export default Details;
