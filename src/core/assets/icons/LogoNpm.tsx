import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <rect
      x={227.6}
      y={213.1}
      width={28.4}
      height={57.1}
      style={{
        fill: 'var(--class-color)',
      }}
    />
    <path
      d="M0,156V327.4H142.2V356H256V327.4H512V156ZM142.2,298.9H113.8V213.2H85.3v85.7H28.4V184.6H142.2Zm142.2,0H227.5v28.6H170.6V184.6H284.4V298.9Zm199.2,0H455.2V213.2H426.8v85.7H398.4V213.2H370v85.7H313.1V184.6H483.8V298.9Z"
      style={{
        fill: 'var(--class-color)',
      }}
    />
  </svg>
));

export default Svg;