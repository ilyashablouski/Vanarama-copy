import React from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import { GetInsuranceLandingPage_insuranceLandingPage_sections_hero as IHero } from '../../../../generated/GetInsuranceLandingPage';
import Hero, { HeroHeading } from '../../../components/Hero';
import config from '../config';
import RouterLink from '../../../components/RouterLink/RouterLink';
import Skeleton from '../../../components/Skeleton';

const Image = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/image'),
  {
    loading: () => <Skeleton count={3} />,
  },
);
const Text = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/text'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const InsuranceHeroSection = ({ title, body, heroCard, image }: IHero) => (
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
    <Image
      optimisedHost={process.env.IMG_OPTIMISATION_HOST}
      alt="Hero Image"
      dataTestId="insurance_hero-image"
      size="expand"
      src={image?.file?.url || config.heroImage.src}
      plain
      className="hero--image"
    />
  </Hero>
);

export default React.memo(InsuranceHeroSection);
