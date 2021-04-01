import React from 'react';
import Icon from 'core/atoms/icon';
import Call from 'core/assets/icons/Call';
import RouterLink from '../RouterLink/RouterLink';
import { ILinkProps } from '../RouterLink/interface';

interface IPhoneNumberProps {
  phoneNumberLink: ILinkProps;
  withIcon?: boolean;
}
const PhoneNumber: React.FC<IPhoneNumberProps> = ({
  phoneNumberLink,
  withIcon,
}) => {
  if (withIcon) {
    return (
      <RouterLink
        key={phoneNumberLink.href}
        link={phoneNumberLink}
        className="header-tel"
      >
        {' '}
        <Icon icon={<Call />} size="xsmall" />{' '}
        <span>{phoneNumberLink.label}</span>{' '}
      </RouterLink>
    );
  }
  return (
    <RouterLink link={phoneNumberLink} className="header-tel">
      <span>{phoneNumberLink.label}</span>
    </RouterLink>
  );
};

export default React.memo(PhoneNumber);
