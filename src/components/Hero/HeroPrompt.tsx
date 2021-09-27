import React from 'react';

import Heading from 'core/atoms/heading';
import RouterLink from '../RouterLink';
import { IHeroPromptProps } from './interface';

const HeroPrompt: React.FC<IHeroPromptProps> = ({
  text,
  label,
  url,
  btnVisible,
}) => (
  <div className="hero-prompt">
    <Heading tag="p" size="regular" color="black">
      {text}
    </Heading>
    {btnVisible && (
      <RouterLink
        link={{
          href: url,
          label,
        }}
        classNames={{ color: 'teal', solid: true, size: 'regular' }}
        className="button"
        dataTestId="heroPrompt-button"
        withoutDefaultClassName
      >
        <div className="button--inner">{label}</div>
      </RouterLink>
    )}
  </div>
);

export default React.memo(HeroPrompt);
