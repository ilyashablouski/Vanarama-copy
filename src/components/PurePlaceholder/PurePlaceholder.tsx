import React from 'react';

interface IPurePlaceholder {
  height: string | number;
  numberOfPlaceholders: number;
}

const PurePlaceholder: React.FC<IPurePlaceholder> = ({
  height,
  numberOfPlaceholders,
}) => {
  return (
    <div className="pure-placeholder">
      <div className="pure-placeholder__wrapper">
        {Array.from({ length: numberOfPlaceholders }).map(
          (placeholderItem, index) => {
            return (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className="pure-placeholder__item"
                style={{
                  width: '100%',
                  height,
                }}
              />
            );
          },
        )}
      </div>
    </div>
  );
};

export default PurePlaceholder;
