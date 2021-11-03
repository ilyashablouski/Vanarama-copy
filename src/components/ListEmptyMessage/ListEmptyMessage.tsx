import React from 'react';
import cx from 'classnames';
import { IBaseProps } from 'core/interfaces/base';

import Text from 'core/atoms/text';
import Heading from 'core/atoms/heading';

interface IListEmptyMessage extends IBaseProps {
  text: string;
  heading?: string;
}

function listEmptyMessage({ text, heading, className }: IListEmptyMessage) {
  return (
    <section className={cx('row:cards-1col', className)}>
      <div className="card -message -flex-h">
        <div className="row:lead-text -m-300">
          <Text className="-m" size="lead" color="darker">
            {text}
          </Text>
          <Heading size="lead" color="darker">
            {heading}
          </Heading>
        </div>
      </div>
    </section>
  );
}

export default listEmptyMessage;
