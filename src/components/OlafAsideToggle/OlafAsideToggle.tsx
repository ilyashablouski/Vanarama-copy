import React, { FC, useState, ReactNode } from 'react';
import cx from 'classnames';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import ChevronUpSharp from '@vanarama/uibook/lib/assets/icons/ChevronUpSharp';
import ChevronDownSharp from '@vanarama/uibook/lib/assets/icons/ChevronDownSharp';

const ButtonWithIcon: FC<{ icon: ReactNode }> = ({ icon }) => {
  return (
    <div className="button--inner">
      View Your Order
      <Icon icon={icon} size="small" color="white" />
    </div>
  );
};

const OlafAsideToggle: React.FC = ({ children }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="-vp-max:small">
      <button
        data-testid="olaf-aside-toggle"
        className={cx(
          `button -darker -xsmall -solid -fullwidth  -mt-400 -mv-400 ${
            toggle ? '-mb-400' : ''
          }`,
        )}
        type="button"
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        <ButtonWithIcon
          icon={!toggle ? <ChevronDownSharp /> : <ChevronUpSharp />}
        />
      </button>

      {!toggle ? null : <div>{children}</div>}
    </div>
  );
};

export default OlafAsideToggle;