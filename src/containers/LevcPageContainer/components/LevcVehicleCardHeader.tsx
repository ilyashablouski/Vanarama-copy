import React from 'react';

import Icon from 'core/atoms/icon';
import LevcLogoIcon from 'core/assets/icons/LogoLevc';

import { ICardHeaderProps } from 'core/molecules/cards/CardHeader';

const LevcVehicleCardHeader = ({
  accentStyles,
  accentText,
  text,
  dataUiTestId,
}: ICardHeaderProps) => (
  <div className="card-header -brand">
    {accentText && (
      <div
        style={{
          background: accentStyles?.color,
          color: accentStyles?.background as string,
        }}
      >
        {accentText}
      </div>
    )}
    <div
      className="text"
      style={accentStyles}
      data-uitestid={`${dataUiTestId}_availability`}
    >
      {text}
    </div>
    <div style={accentStyles}>
      <Icon
        className="sm hydrated"
        icon={<LevcLogoIcon />}
        color="black"
        size="small"
      />
    </div>
  </div>
);

export default LevcVehicleCardHeader;
