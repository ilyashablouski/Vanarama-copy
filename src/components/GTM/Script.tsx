import React, { FC, memo } from 'react';

const Script: FC = () => {
  const code = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${process.env.GTM_ID}');`;

  const codeWithCustomAtribute = code.replace(
    'j.async=true;',
    "j.async=true;j.setAttribute('data-cfasync',false);",
  );

  return process.env.GTM_ID ? (
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: codeWithCustomAtribute,
      }}
    />
  ) : null;
};

Script.displayName = 'GTMScript';

export default memo(Script);
