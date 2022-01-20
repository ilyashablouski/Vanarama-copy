import React from 'react';

import ImageV2 from 'core/atoms/image/ImageV2';
import ColoredSection from 'core/atoms/colored-section/ColoredSection';
import { useMobileViewport } from '../../../hooks/useMediaQuery';

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
  const isMobile = useMobileViewport();

  return (
    <>
      <div className="full-screen-image">
        <ImageV2
          quality={70}
          optimisedHost
          lazyLoad={false}
          src={isMobile ? backgroundUrlMobile : backgroundUrl}
          className="row:bg-hero -levc-hero"
        />
      </div>
      <ColoredSection className="colored-section" backgroundColor={accentColor}>
        <ImageV2 sizes="30vw" className="levc-logo" src={logoUrl} plain />
      </ColoredSection>
    </>
  );
};

export default LevcHeroBanner;
