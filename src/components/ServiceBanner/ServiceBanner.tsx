import React from 'react';
import Text from 'core/atoms/text';
import Link from 'core/atoms/link';

interface IServiceBannerLink {
  url?: string | null;
  text?: string | null;
}

interface IServiceBannerProps {
  enabled?: boolean | null;
  message?: string | null;
  link?: IServiceBannerLink | null;
}

const ServiceBanner: React.FC<IServiceBannerProps> = ({
  enabled,
  message,
  link,
}) => {
  if (!enabled) {
    return null;
  }

  return (
    <div className="service-banner">
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
