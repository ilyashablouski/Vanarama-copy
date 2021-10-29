import React, { FC, memo } from 'react';

const EarRightLargeIcon: FC = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="80"
    height="80"
    viewBox="0 0 80 80"
    preserveAspectRatio="none"
  >
    <path
      d="M80,20H20V80L0,100H80L40,60Z"
      transform="translate(0 -20)"
      fill="currentColor"
    />
    <path d="M80,80H60v20Z" transform="translate(-60 -20)" fill="#2a2b2d" />
  </svg>
));

export default EarRightLargeIcon;
