import React, { FC, memo } from 'react';

const DataLayer: FC = () => {
  const code = `window.dataLayer = window.dataLayer || [];`;

  return process.env.GTM_ID ? (
    <script
      type="text/javascript"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: code,
      }}
    />
  ) : null;
};

export default memo(DataLayer);
