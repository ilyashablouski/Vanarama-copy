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

const ImageV2 = dynamic(() => import('core/atoms/image/ImageV2'), {
  loading: () => <Skeleton count={3} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

const CompetitionHeroSection = ({
  title,
  image,
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
          <Text {...props} tag="h3" size="large" color="white" />
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
        quality={70}
        size="expand"
        lazyLoad={false}
        className="hero--image -pt-000"
        dataTestId="insurance_hero-image"
        width={image?.file?.details.image.width ?? 840}
        height={image?.file?.details.image.height ?? 298}
        src={image?.file?.url || config.heroImage.src}
        alt="Hero Image"
        plain
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
