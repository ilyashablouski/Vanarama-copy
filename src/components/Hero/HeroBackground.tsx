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
      style={{ '--hero-bg': `url(${backgroundUrl})` }}
      className={cx('row:bg-hero', className, {
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
