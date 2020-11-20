import React, { FC } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import CheckmarkCircleSharp from '@vanarama/uibook/lib/assets/icons/CheckmarkCircleSharp';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import {
  GenericPageQuery_genericPage_sections as Section,
  GenericPageQuery_genericPage_sections_cards_cards as CardData,
} from '../../../generated/GenericPageQuery';
import RouterLink from '../../components/RouterLink/RouterLink';
import { getSectionsData } from '../../utils/getSectionsData';
import getTitleTag from '../../utils/getTitleTag';

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
