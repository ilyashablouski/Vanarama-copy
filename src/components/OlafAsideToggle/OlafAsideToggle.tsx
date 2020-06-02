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
        dataTestId="olaf-aside-toggle"
        className={cx('-fullwidth -mt-400 -mv-400', {
          '-mb-400': toggle,
        })}
        onClick={() => {
          setToggle(prev => !prev);
        }}
        color="darker"
        fill="solid"
        size="xsmall"
        label="View Your Order"
        iconPosition="after"
        iconColor="white"
        icon={!toggle ? <ChevronDownSharp /> : <ChevronUpSharp />}
      />

      {toggle && <div>{children}</div>}
    </div>
  );
};

export default OlafAsideToggle;
