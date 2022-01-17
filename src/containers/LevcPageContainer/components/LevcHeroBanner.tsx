import React from 'react';

import ImageV2 from 'core/atoms/image/ImageV2';
import ColoredSection from 'core/atoms/colored-section/ColoredSection';

interface IProps {
  backgroundUrl: string;
  backgroundUrlMobile: string;
  logoUrl: string;
  accentColor: string;
}

const LevcHeroBanner: React.FC<IProps> = ({
  backgroundUrl,
  backgroundUrlMobile,
  logoUrl,
  accentColor,
}) => {
  const backgroundCustomProps = {
    '--hero-bg': `url(${backgroundUrl})`,
    '--hero-bg-mobile': `url(${backgroundUrlMobile})`,
  };

  return (
    <>
      <div className="row:bg-hero -levc-hero" style={backgroundCustomProps} />
      <ColoredSection className="colored-section" backgroundColor={accentColor}>
        <ImageV2 sizes="30vw" className="levc-logo" src={logoUrl} plain />
      </ColoredSection>
    </>
  );
};

export default LevcHeroBanner;
