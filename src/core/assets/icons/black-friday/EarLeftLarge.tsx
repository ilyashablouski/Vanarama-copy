import React, { FC, memo } from 'react';

const EarLeftLargeIcon: FC = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="80"
    height="80"
    viewBox="0 0 80 80"
    preserveAspectRatio="none"
  >
    <path
      d="M0,20H60V80l20,20H0L40,60Z"
      transform="translate(0 -20)"
      fill="currentColor"
    />
    <path d="M60,80H80v20Z" transform="translate(0 -20)" fill="#2a2b2d" />
  </svg>
));

export default EarLeftLargeIcon;
