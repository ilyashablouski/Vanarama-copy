import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown/with-html';
import Icon from 'core/atoms/icon';
import Hero from '../../components/Hero';
import Skeleton from '../../components/Skeleton';
import { filterList as IFilterList } from '../../../generated/filterList';
import { GenericPageQuery_genericPage_sectionsAsArray } from '../../../generated/GenericPageQuery';

const ImageV2 = dynamic(() => import('core/atoms/image/ImageV2'), {
  loading: () => <Skeleton count={4} />,
});
const RouterLink = dynamic(() =>
  import('../../components/RouterLink/RouterLink'),
);
const ArrowForward = dynamic(() => import('core/assets/icons/ArrowForward'), {
  ssr: false,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps {
  searchPodCarsData: IFilterList;
  sectionsAsArray: GenericPageQuery_genericPage_sectionsAsArray | null;
}

const CarHubHeroContainer: FC<IProps> = ({
  sectionsAsArray,
  searchPodCarsData,
}) => {
  const heroSection = sectionsAsArray?.hero?.[0];
  const heroImage = heroSection?.image?.file;
  const heroImageDetails = heroImage?.details.image;
  const heroBody = heroSection?.body || '';
  const heroTerms = heroSection?.heroTerms || '';
  const title = heroSection?.title;
  const heroCta = heroSection?.heroCta?.[0];

  return (
    <Hero
      searchPodCarsData={searchPodCarsData}
      isCustomSearchButtonLabel
      className="cars-hub-hero"
      isCurve={false}
    >
      <div className="cars-hub-hero--card">
        <ImageV2
          plain
          quality={70}
          size="expand"
          optimisedHost
          lazyLoad={false}
          className="cars-hub-hero--image"
          width={heroImageDetails?.width ?? 1710}
          height={heroImageDetails?.height ?? 1278}
          src={
            heroImage?.url ||
            `${process.env.HOST_DOMAIN}/vehiclePlaceholder.jpg`
          }
        />
        <h2 className="cars-hub-hero--title">{title}</h2>
        <div className="cars-hub-hero--description">
          <ReactMarkdown
            allowDangerousHtml
            source={heroBody}
            renderers={{
              link: props => {
                const { href, children } = props;
                return <RouterLink link={{ href, label: children }} />;
              },
              paragraph: props => <Text {...props} tag="p" color="darker" />,
            }}
          />
          <RouterLink
            link={{
              href: heroCta?.url || '',
              label: heroCta?.text || '',
            }}
            classNames={{ color: 'teal', solid: true, size: 'regular' }}
            className="button"
          >
            {heroCta?.text}{' '}
            <Icon
              icon={<ArrowForward />}
              className="-regular md hydrated"
              name="arrow-forward"
              color="white"
            />
          </RouterLink>
        </div>
        <div className="cars-hub-hero--term">
          <ReactMarkdown allowDangerousHtml source={heroTerms} />
        </div>
      </div>
    </Hero>
  );
};

export default CarHubHeroContainer;
