import React, { FC, memo } from 'react';

const LayerIcon: FC = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="140"
    height="40"
    viewBox="0 0 175 50"
    preserveAspectRatio="none"
  >
    <defs>
      <linearGradient id="linear-gradient" y1="0.5" x2="1" y2="0.5">
        <stop offset="0" stopColor="#eb6209" />
        <stop offset="1" stopColor="#f5990f" />
      </linearGradient>
    </defs>
    <path
      d="M408,4H233l14.286,8.75L233,20.25,247.286,29,233,37.75l14.286,7.5L233,54H408l-14.286-8.75L408,37.75,393.714,29,408,20.25l-14.286-7.5Z"
      transform="translate(-233 -4)"
      fill="url(#linear-gradient)"
    />
  </svg>
));

export default LayerIcon;
