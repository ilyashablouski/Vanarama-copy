import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <path
      d="M342,444h46a56,56,0,0,0,56-56V342"
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 44,
      }}
    />
    <path
      d="M444,170V124a56,56,0,0,0-56-56H342"
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 44,
      }}
    />
    <path
      d="M170,444H124a56,56,0,0,1-56-56V342"
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 44,
      }}
    />
    <path
      d="M68,170V124a56,56,0,0,1,56-56h46"
      style={{
        fill: 'none',
        stroke: 'var(--class-color)',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 44,
      }}
    />
  </svg>
));

export default Svg;
