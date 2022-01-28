import React from 'react';

import Icon from 'core/atoms/icon';
import LevcLogoIcon from 'core/assets/icons/LogoLevc';

import { ICardHeaderProps } from 'core/molecules/cards/CardHeader';
import { normalizeString } from '../../../utils/data';

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
        data-uitestid={
          dataUiTestId
            ? `${dataUiTestId}_${normalizeString(accentText)}`
            : undefined
        }
      >
        {accentText}
      </div>
    )}
    <div
      className="text"
      style={accentStyles}
      data-uitestid={dataUiTestId ? `${dataUiTestId}_availability` : undefined}
    >
      {text}
    </div>
    <div
      style={accentStyles}
      data-uitestid={
        dataUiTestId ? `${dataUiTestId}_levc-logo-icon` : undefined
      }
    >
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
