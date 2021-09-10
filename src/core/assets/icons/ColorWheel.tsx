import React, { FC, memo } from 'react';

const ColorWheelIcon: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 20 20">
    <path
      d="M12,0a10,10,0,0,1,7.071,2.929L15.535,6.464A5,5,0,0,0,12,5Z"
      transform="translate(-2)"
      fill="#f44335"
    />
    <path
      d="M19.778,3.515a10,10,0,0,1,2.929,7.071h-5A5,5,0,0,0,16.243,7.05Z"
      transform="translate(-2.707 -0.586)"
      fill="#ff9801"
    />
    <path
      d="M22.707,12a10,10,0,0,1-2.929,7.071l-3.536-3.536A5,5,0,0,0,17.707,12Z"
      transform="translate(-2.707 -2)"
      fill="#ffdf00"
    />
    <path
      d="M19.071,19.778A10,10,0,0,1,12,22.707v-5a5,5,0,0,0,3.535-1.465Z"
      transform="translate(-2 -2.707)"
      fill="#91c400"
    />
    <path
      d="M10.586,22.707a10,10,0,0,1-7.071-2.929L7.05,16.243a5,5,0,0,0,3.536,1.465Z"
      transform="translate(-0.586 -2.707)"
      fill="#4ea917"
    />
    <path
      d="M2.929,19.071A10,10,0,0,1,0,12H5a5,5,0,0,0,1.464,3.535Z"
      transform="translate(0 -2)"
      fill="#02a9f4"
    />
    <path
      d="M0,10.586A10,10,0,0,1,2.929,3.515L6.464,7.05A5,5,0,0,0,5,10.586Z"
      transform="translate(0 -0.586)"
      fill="#9d27b0"
    />
    <path
      d="M3.515,2.929A10,10,0,0,1,10.586,0V5A5,5,0,0,0,7.05,6.464Z"
      transform="translate(-0.586)"
      fill="#e91e63"
    />
  </svg>
));

export default ColorWheelIcon;
