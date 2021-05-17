import React from 'react';
import HeroCurve from './HeroCurve';

import { IHeroProps } from './interface';

const HeroEv: React.FC<IHeroProps> = ({ children, hideCurve, smallPrint }) => {
  return (
    <div className="row:bg-hero">
      <div className="row:hero ev-hero">
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

export default HeroEv;
