import React, { FC, memo } from 'react';

const GTM: FC = () => {
  const code = `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${process.env.GTM_ID}');</script>`;

  return (
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={code}
    />
  );
};

export default memo(GTM);
