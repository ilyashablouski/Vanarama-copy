import React, { FC, memo } from 'react';
import cx from 'classnames';

import { IStepProps } from './interfaces';
import Heading from '../../atoms/heading';
import Text from '../../atoms/text';
import { normalizeString } from '../../../utils/data';

const Step: FC<IStepProps> = memo(props => {
  const { className, step, heading, text, dataUiTestId } = props;

  return (
    <div className={cx('step', className)}>
      <div className="step--index"> {step}</div>
      <Heading
        tag="span"
        color="black"
        className="lead"
        dataUiTestId={
          dataUiTestId
            ? `${dataUiTestId}_heading_${normalizeString(heading)}`
            : undefined
        }
      >
        {heading}
      </Heading>
      <Text
        color="darker"
        size="regular"
        dataUiTestId={
          dataUiTestId
            ? `${dataUiTestId}_description_${normalizeString(heading)}`
            : undefined
        }
      >
        {text}
      </Text>
    </div>
  );
});

export default Step;
