import React from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import { GetInsuranceLandingPage_insuranceLandingPage_sections_hero as IHero } from '../../../../generated/GetInsuranceLandingPage';
import CompetitionHero, {
  CompetitionHeroHeading,
  CompetitionHeroPrompt,
} from '../../../components/CompetitionHero';
import config from '../config';
import RouterLink from '../../../components/RouterLink/RouterLink';
import Skeleton from '../../../components/Skeleton';

const Image = dynamic(() => import('core/atoms/image'), {
  loading: () => <Skeleton count={3} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

const CompetitionHeroSection = ({
  title,
  body,
  heroCard,
  heroLabel,
}: IHero) => (
  <CompetitionHero workingHoursCard={(heroCard && heroCard[0]) || undefined}>
    <CompetitionHeroHeading text={title || ''} />
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
      <Image
        optimisedHost={process.env.IMG_OPTIMISATION_HOST}
        alt="Hero Image"
        dataTestId="insurance_hero-image"
        size="expand"
        src={config.heroImage.src}
        plain
        className="hero--image"
      />
    </div>
    {heroLabel?.[0]?.visible && (
      <CompetitionHeroPrompt
        label={heroLabel?.[0]?.link?.text || ''}
        url={heroLabel?.[0]?.link?.url || ''}
        text={heroLabel?.[0]?.text || ''}
        btnVisible={heroLabel?.[0]?.link?.visible}
      />
    )}
  </CompetitionHero>
);

export default React.memo(CompetitionHeroSection);
