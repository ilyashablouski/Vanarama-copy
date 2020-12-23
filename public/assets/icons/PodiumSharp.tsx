import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <rect x={160} y={32} width={192} height={448} />
    <rect x={384} y={192} width={112} height={288} />
    <rect x={16} y={128} width={112} height={352} />
  </svg>
));

export default Svg;
