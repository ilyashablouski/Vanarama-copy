import React from 'react';

import Icon from 'core/atoms/icon';
import LevcLogoIcon from 'core/assets/icons/LogoLevc';
import ColoredSection from 'core/atoms/colored-section/ColoredSection';

const LevcHeroBanner = () => (
  <>
    <section className="row:bg-hero -levc-hero" />
    <ColoredSection backgroundColor="#ffec00" className="colored-section">
      <Icon icon={<LevcLogoIcon />} className="levc-logo" color="black" />
    </ColoredSection>
  </>
);

export default LevcHeroBanner;
