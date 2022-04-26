import React from 'react';
import cx from 'classnames';

import HeroCurve from './HeroCurve';
import { IHeroProps } from './interface';

const HeroBackground: React.FC<IHeroProps> = ({
  backgroundUrl,
  children,
  hideCurve,
  smallPrint,
  expand,
  className,
}) => {
  return (
    <div
      style={{
        // if use image as css variable it loading twice
        backgroundImage: `url(${backgroundUrl}), linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4))`,
      }}
      className={cx('row:bg-hero hero-bg', className, {
        '-expand': expand,
      })}
    >
      <div className="row:hero">
        {children}
        {!hideCurve && (
          <div className="hero--decals">
            <HeroCurve />
          </div>
        )}
        {smallPrint && <p className="nlol-small-print">{smallPrint}</p>}
      </div>
    </div>
  );
};

export default HeroBackground;
