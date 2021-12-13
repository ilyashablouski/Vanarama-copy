import React from 'react';
import LEVCLogo from 'core/assets/icons/LEVCLogo';
import ColoredSection from 'core/atoms/colored-section/ColoredSection';

const LevcHeroSection = () => {
  return (
    <>
      <section className="row:bg-hero -levc-hero" />
      <ColoredSection backgroundColor="#ffec00" className="colored-section">
        <LEVCLogo color="#000" className="levc-logo" />
      </ColoredSection>
    </>
  );
};

export default LevcHeroSection;
