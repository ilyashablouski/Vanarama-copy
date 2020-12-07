import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import {
  GenericPageQuery_genericPage_sections as Section,
  GenericPageQuery_genericPage_sections_cards_cards as CardData,
} from '../../../generated/GenericPageQuery';
import RouterLink from '../../components/RouterLink/RouterLink';
import { getSectionsData } from '../../utils/getSectionsData';
import getTitleTag from '../../utils/getTitleTag';
import Skeleton from '../../components/Skeleton';

const CheckmarkCircleSharp = dynamic(
  () => import('@vanarama/uibook/lib/assets/icons/CheckmarkCircleSharp'),
  {
    ssr: false,
  },
);
const Heading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/heading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Icon = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/icon'),
  {
    loading: () => <Skeleton count={4} />,
    ssr: false,
  },
);
const Text = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/text'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Card = dynamic(
  () => import('@vanarama/uibook/lib/components/molecules/cards'),
  {
    loading: () => <Skeleton count={5} />,
  },
);

interface IProps {
  sections: Section | null | undefined;
}

const ThankYouContainer: FC<IProps> = ({ sections }) => {
  const cards = getSectionsData(['carousel', 'cards'], sections);
  const leadText = sections?.leadText;

  return (
    <>
      <div className="row:title" />
      <div className="row:lead-text">
        <Heading
          tag={getTitleTag(leadText?.titleTag || 'h1') as any}
          size="xlarge"
          color="black"
        >
          <Icon
            className="-pr-300"
            color="success"
            icon={<CheckmarkCircleSharp />}
          />
          {leadText?.heading}
        </Heading>
        <Text size="lead" color="darker">
          {leadText?.description}
        </Text>
      </div>
      <div className="row:bg-lighter">
        <div className="row:cards-3col">
          <Heading size="large" color="black">
            {sections?.carousel?.title}
          </Heading>
          {cards?.map((c: CardData, idx: number) => (
            <Card
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
              key={c.title || idx}
              title={{
                title: '',
                withBtn: true,
                link: (
                  <Heading tag={getTitleTag(c.titleTag || 'span') as any}>
                    <RouterLink
                      link={{
                        href: c.link?.legacyUrl || c.link?.url || '#',
                        label: c.link?.text || '',
                      }}
                      className="heading"
                      classNames={{ size: 'lead', color: 'black' }}
                    >
                      {c.title}
                    </RouterLink>
                  </Heading>
                ),
              }}
              imageSrc={c.image?.file?.url || ''}
              description={c.body || ''}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ThankYouContainer;
