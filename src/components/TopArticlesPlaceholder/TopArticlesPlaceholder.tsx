import React from 'react';

interface IPurePlaceholder {
  height: string | number;
  numberOfPlaceholders: number;
}

const TopArticlesPlaceholder: React.FC<IPurePlaceholder> = ({
  height,
  numberOfPlaceholders,
}) => {
  return (
    <div className="article-placeholder">
      <div className="article-placeholder__wrapper">
        {Array.from({ length: numberOfPlaceholders }).map((_, index) => {
          return (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className="article-placeholder__item"
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

export default TopArticlesPlaceholder;
