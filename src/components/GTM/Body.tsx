import React, { FC, memo } from 'react';

const Body: FC = () => {
  return process.env.GTM_ID ? (
    <noscript>
      <iframe
        title="gtm"
        src={`https://www.googletagmanager.com/ns.html?id=GTM-P2SD8SS`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  ) : null;
};

export default memo(Body);
