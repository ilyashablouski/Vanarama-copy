import React, { FC } from 'react';

import { INavItemProps } from './interfaces';

const NavItem: FC<INavItemProps> = props => {
  const { selected, label, onClick } = props;

  return (
    <button
      className="slideout-modal--nav-item"
      type="button"
      onClick={onClick}
    >
      <span className="slideout-modal--nav-item-label">{label}</span>
      {selected && (
        <span className="slideout-modal--nav-item-selected">
          {selected.join(', ')}
        </span>
      )}
    </button>
  );
};

export default React.memo(NavItem);
