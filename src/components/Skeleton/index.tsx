import React from 'react';
import NoSSR from 'react-no-ssr';
import ReactSkeleton from 'react-loading-skeleton';

interface ISkeleton {
  count: number;
}

const Skeleton: React.FC<ISkeleton> = ({ count }) => {
  return (
    <NoSSR>
      <div
        style={{
          fontSize: '24px',
          lineHeight: 1.75,
          opacity: 0.75,
          color: '#ccc',
        }}
      >
        <ReactSkeleton count={count || 1} />
      </div>
    </NoSSR>
  );
};

export default React.memo(Skeleton);
