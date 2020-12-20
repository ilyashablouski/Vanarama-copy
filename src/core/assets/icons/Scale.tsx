import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1rem" height="1rem" viewBox="0 0 512 512" fill="none">
    <path
      d="M236 175.721L200.639 105L128 105L128 65L384 65V105L311.361 105L276 175.721V386.88H404V447H108V386.88H236V175.721Z"
      style={{
        fill: 'var(--class-color)',
      }}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M43 307.681C84.6128 366.095 171.387 366.095 213 307.681L128 128L43 307.681ZM165.037 299.831L128 221.54L90.9631 299.831C113.022 315.378 142.978 315.378 165.037 299.831Z"
      style={{
        fill: 'var(--class-color)',
      }}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M469 307.681C427.387 366.095 340.613 366.095 299 307.681L384 128L469 307.681ZM384 221.54L421.037 299.831C398.978 315.378 369.022 315.378 346.963 299.831L384 221.54Z"
      style={{
        fill: 'var(--class-color)',
      }}
    />
  </svg>
));

export default Svg;
