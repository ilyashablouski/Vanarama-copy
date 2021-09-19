import React from 'react';
import cx from 'classnames';

import HeroCurve from './HeroCurve';
import { IHeroProps } from './interface';

const HeroBg: React.FC<IHeroProps> = ({
  backgroundUrl,
  children,
  hideCurve,
  smallPrint,
  expand,
}) => {
  return (
    <div
      style={{ '--hero-bg': `url(${backgroundUrl})` } as any}
      className={cx('row:bg-hero', {
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

export default HeroBg;
