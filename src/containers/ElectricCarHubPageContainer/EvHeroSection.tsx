import CardLabel from 'core/molecules/cards/CardLabel';
import FreeHomeCharger from 'core/assets/icons/FreeHomeCharger';
import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import Hero from '../../components/Hero';
import Skeleton from '../../components/Skeleton';
import { filterList as IFilterList } from '../../../generated/filterList';
import { GenericPageQuery_genericPage_sectionsAsArray } from '../../../generated/GenericPageQuery';

const Image = dynamic(() => import('core/atoms/image'), {
  loading: () => <Skeleton count={4} />,
});
const Price = dynamic(() => import('core/atoms/price'));
const RouterLink = dynamic(() =>
  import('../../components/RouterLink/RouterLink'),
);

interface IProps {
  searchPodCarsData: IFilterList;
  sectionsAsArray: GenericPageQuery_genericPage_sectionsAsArray | null;
}

const EvHeroSection: FC<IProps> = ({ sectionsAsArray, searchPodCarsData }) => {
  const heroBody = sectionsAsArray?.hero?.[0]?.body;
  const heroBodyArr = heroBody?.split(' ');
  const priceLabel = heroBody?.slice(0, heroBody.indexOf('£'));
  const price = heroBodyArr?.find(phrase => phrase.includes('£'));
  const priceDescription = heroBody?.replace(`${priceLabel}${price}`, '');

  return (
    <Hero
      searchPodCarsData={searchPodCarsData}
      isCustomSearchButtonLabel
      className="electric-hero"
    >
      <div className="electric-hero--card">
        <h2 className="electric-hero--title">
          {sectionsAsArray?.hero?.[0]?.title}
        </h2>
        <CardLabel
          className="electric-hero--extras"
          text="Free Home charger"
          icon={<FreeHomeCharger />}
        />
        <Image
          lazyLoad
          className="electric-hero--image"
          plain
          size="expand"
          src={
            sectionsAsArray?.hero?.[0]?.image?.file?.url ||
            'https://ellisdonovan.s3.eu-west-2.amazonaws.com/benson-hero-images/connect.png'
          }
        />
        <section className="electric-hero--description ">
          <Price
            price={Number(price?.slice(1))}
            size="large"
            separator="."
            priceDescription={priceDescription}
            priceLabel={priceLabel}
          />
          <RouterLink
            link={{
              href: sectionsAsArray?.hero?.[0]?.heroCta?.[0]?.url || '',
              label: 'View Deal',
            }}
            classNames={{ color: 'teal', solid: true, size: 'regular' }}
            className="button"
          >
            <div className="button--inner">
              {sectionsAsArray?.hero?.[0]?.heroCta?.[0]?.text}
            </div>
          </RouterLink>
        </section>
      </div>
    </Hero>
  );
};

export default EvHeroSection;
