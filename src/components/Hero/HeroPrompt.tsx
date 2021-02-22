import React from 'react';
import Heading from 'core/atoms/heading';
import RouterLink from '../RouterLink/RouterLink';
import Skeleton from '../Skeleton';

interface IHeroPromptProps {
  text: string;
  label: string;
  url: string;
}

const HeroPrompt: React.FC<IHeroPromptProps> = ({ text, label, url }) => {
  if (!text) return <Skeleton count={2} />;

  return (
    <div className="hero-prompt">
      <Heading tag="p" size="regular" color="black">
        {text}
      </Heading>
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
    </div>
  );
};

export default React.memo(HeroPrompt);
