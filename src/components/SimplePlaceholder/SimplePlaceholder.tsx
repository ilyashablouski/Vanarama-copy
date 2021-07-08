import React from 'react';

interface IPurePlaceholder {
  height: string | undefined;
  numberOfPlaceholders: number;
}

const SimplePlaceholder: React.FC<IPurePlaceholder> = ({
  height,
  numberOfPlaceholders,
}) => {
  return (
    <div className="simple-placeholder">
      <div className="simple-placeholder__wrapper">
        {Array.from({ length: numberOfPlaceholders }).map((_, index) => {
          return (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className="simple-placeholder__item"
              style={{
                width: '100%',
                height,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SimplePlaceholder;
