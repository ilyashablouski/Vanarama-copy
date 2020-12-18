import React, { FC, memo } from 'react';
import cx from 'classnames';

import { IStepProps } from './interfaces';
import Heading from '../../atoms/heading';
import Text from '../../atoms/text';

const Step: FC<IStepProps> = memo(props => {
  const { className, step, heading, text } = props;

  return (
    <div className={cx('step', className)}>
      <div className="step--index"> {step}</div>
      <Heading tag="span" color="black" className="lead">
        {heading}
      </Heading>
      <Text color="darker" size="regular">
        {text}
      </Text>
    </div>
  );
});

export default Step;
