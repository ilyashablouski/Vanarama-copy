import React from 'react';

interface ISimplePlaceholder {
  width?: string | number;
  height: string | number;
}

const SimplePlaceholder: React.FC<ISimplePlaceholder> = ({
  width = '100%',
  height,
}) => {
  return (
    <div
      className="simple-placeholder"
      style={{
        width,
        height,
      }}
    />
  );
};

export default React.memo(SimplePlaceholder);
