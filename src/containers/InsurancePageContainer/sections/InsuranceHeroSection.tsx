import React from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import { GetInsuranceLandingPage_insuranceLandingPage_sections_hero as IHero } from '../../../../generated/GetInsuranceLandingPage';
import Hero, { HeroHeading, HeroPrompt } from '../../../components/Hero';
import config from '../config';
import RouterLink from '../../../components/RouterLink/RouterLink';
import Skeleton from '../../../components/Skeleton';

const ImageV2 = dynamic(() => import('core/atoms/image/ImageV2'), {
  loading: () => <Skeleton count={3} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

const InsuranceHeroSection = ({
  title,
  body,
  heroCard,
  image,
  heroLabel,
}: IHero) => (
  <Hero workingHoursCard={(heroCard && heroCard[0]) || undefined}>
    <HeroHeading text={title || ''} />
    <ReactMarkdown
      allowDangerousHtml
      source={body || ''}
      renderers={{
        heading: props => (
          <Text {...props} tag="h3" size="large" color="white" />
        ),
        paragraph: props => (
          <Text
            {...props}
            tag="p"
            size="xsmall"
            color="white"
            className="hero--small-print"
          />
        ),
        link: props => {
          const { href, children } = props;
          return (
            <RouterLink
              link={{ href, label: children }}
              classNames={{ color: 'teal' }}
            />
          );
        },
      }}
    />
    <div>
      <ImageV2
        className="hero--image hero--image-insurance -pt-000"
        width={image?.file?.details.image.width ?? 840}
        height={image?.file?.details.image.height ?? 298}
        src={image?.file?.url || config.heroImage.src}
        dataTestId="insurance_hero-image"
        lazyLoad={false}
        optimisedHost
        size="expand"
        quality={70}
        plain
      />
    </div>
    {heroLabel?.[0]?.visible && (
      <HeroPrompt
        label={heroLabel?.[0]?.link?.text || ''}
        url={heroLabel?.[0]?.link?.url || ''}
        text={heroLabel?.[0]?.text || ''}
        btnVisible={heroLabel?.[0]?.link?.visible}
      />
    )}
  </Hero>
);

export default React.memo(InsuranceHeroSection);
