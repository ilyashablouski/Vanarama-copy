import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 512 512">
    <rect x={16} y={120} width={480} height={48} />
    <rect x={96} y={232} width={320} height={48} />
    <rect x={192} y={344} width={128} height={48} />
  </svg>
));

export default Svg;
