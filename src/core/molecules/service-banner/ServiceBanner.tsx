import React from 'react';
import Text from 'core/atoms/text';
import Link from 'core/atoms/link';
import { IServiceBanner } from 'core/molecules/service-banner/interfaces';
import cx from 'classnames';

const ServiceBanner: React.FC<IServiceBanner> = ({
  enable,
  message,
  link,
  className,
}) => {
  if (!enable) {
    return null;
  }

  return (
    <div className={cx('service-banner', className)}>
      <div className="-ml-600 -mr-600 -a-center">
        <Text color="black">{message}</Text>
        {` `}
        <Link color="black" className="-underline" href={link?.url || ''}>
          {link?.text}
        </Link>
      </div>
    </div>
  );
};

export default ServiceBanner;
