import React, { FC } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import Media from '@vanarama/uibook/lib/components/atoms/media';
import {
  GenericPageQuery_genericPage_sections as Section,
  GenericPageQuery_genericPage_sections_cards_cards as Cards,
} from '../../../generated/GenericPageQuery';
import { getSectionsData } from '../../utils/getSectionsData';
import RouterLink from '../../components/RouterLink/RouterLink';

interface IProps {
  sections: Section | null;
  title: string | null;
  body: string | null;
}

const LeasingExplainedContainer: FC<IProps> = ({ title, sections }) => {
  const cards = getSectionsData(['cards', 'cards'], sections);
  const featured = sections?.featured;
  const leadText = sections?.leadText;

  return (
    <>
      <div className="row:title">
        <Heading size="xlarge" color="black" tag="h1">
          {title}
        </Heading>
      </div>
      <div className="row:bg-black">
        <div className="row:featured-right">
          <div>
            <Heading tag="span" size="large" color="white">
              {featured?.title || ''}
            </Heading>
            <Text tag="p" size="regular" color="white">
              {featured?.body || ''}
            </Text>
            {featured?.link && (
              <RouterLink
                classNames={{ color: 'teal', solid: true, size: 'regular' }}
                className="button"
                link={{
                  href: featured?.link?.legacyUrl || featured?.link?.url || '',
                  label: featured?.link?.text || '',
                }}
              >
                <div className="button--inner">{featured?.link?.text}</div>
              </RouterLink>
            )}
          </div>
          <Media src={featured?.video || ''} width="100%" height="360px" />
        </div>
      </div>
      <div className="row:lead-text">
        <Heading size="large" color="black">
          {leadText?.heading}
        </Heading>
        <Text size="regular" color="darker">
          {leadText?.description}
        </Text>
      </div>
      <div className="row:bg-lighter -thin">
        <div className="row:results">
          <div className="row:cards-3col">
            {cards?.map((el: Cards, ind: number) => (
              <Card
                optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                key={`${el?.title}_${ind}`}
                title={{
                  title: el?.title || '',
                  link: (
                    <RouterLink
                      withoutDefaultClassName
                      className="heading"
                      classNames={{ color: 'black', size: 'lead' }}
                      link={{
                        href: el.link?.legacyUrl || el.link?.url || '',
                        label: el.title || '',
                      }}
                    >
                      {el.title}
                    </RouterLink>
                  ),
                }}
                imageSrc={el.image?.file?.url}
                description={el?.body || ''}
              >
                <RouterLink
                  classNames={{ color: 'teal', solid: true, size: 'small' }}
                  className="button -mt-400"
                  link={{
                    href: el.link?.legacyUrl || el.link?.url || '',
                    label: el?.link?.text || '',
                  }}
                >
                  <div className="button--inner">{el.link?.text}</div>
                </RouterLink>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LeasingExplainedContainer;
