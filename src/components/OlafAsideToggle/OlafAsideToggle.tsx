import React, { useState } from 'react';
import cx from 'classnames';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import ChevronUpSharp from '@vanarama/uibook/lib/assets/icons/ChevronUpSharp';
import ChevronDownSharp from '@vanarama/uibook/lib/assets/icons/ChevronDownSharp';

const OlafAsideToggle: React.FC = ({ children }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="-vp-max:small">
      <Button
        className={cx('-fullwidth -mt-400 -mv-400', {
          '-mb-400': toggle,
        })}
        color="darker"
        dataTestId="olaf-aside-toggle"
        fill="solid"
        icon={!toggle ? <ChevronDownSharp /> : <ChevronUpSharp />}
        iconColor="white"
        iconPosition="after"
        label="View Your Order"
        onClick={() => {
          setToggle(prev => !prev);
        }}
        size="xsmall"
      />

      {toggle && <div>{children}</div>}
    </div>
  );
};

export default OlafAsideToggle;
