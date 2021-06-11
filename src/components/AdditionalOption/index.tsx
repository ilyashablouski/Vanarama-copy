import React, { useEffect, useReducer, useCallback } from 'react';
import cx from 'classnames';
import Card from 'core/molecules/cards';
import Heading from 'core/atoms/heading';
import Checkbox from 'core/atoms/checkbox';

export interface AdditionalOptionProps {
  heading: string;
  className?: string;
}

const AdditionalOption: React.FC<AdditionalOptionProps> = ({ heading, className }) => {

  return (
    <Card withoutBoxShadow className={cx('-flex', className)}>
      <Heading size="lead" color="black" tag="span">
        {heading}
      </Heading>
      <div>asdasd</div>
    </Card>
  );
};

export default AdditionalOption;
