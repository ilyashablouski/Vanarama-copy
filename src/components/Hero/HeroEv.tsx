import React from 'react';
import ReactMarkdown from 'react-markdown';
import HeroCurve from './HeroCurve';

import { IHeroProps } from './interface';

const HeroEv: React.FC<IHeroProps> = ({
  children,
  hideCurve,
  smallPrint,
  terms,
}) => {
  return (
    <div className="row:bg-hero">
      <div className="row:hero ev-hero">
        {children}
        {!hideCurve && (
          <div className="hero--decals">
            <HeroCurve />
          </div>
        )}
        {smallPrint && (
          <p className="nlol-small-print smallPrint">{smallPrint}</p>
        )}
        {terms && (
          <ReactMarkdown
            className="nlol-small-print"
            allowDangerousHtml
            source={terms}
          />
        )}
      </div>
    </div>
  );
};

export default HeroEv;
