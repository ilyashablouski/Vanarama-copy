import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import IvanCta from '@vanarama/uibook/lib/components/molecules/ivan-cta';
import Carousel from '@vanarama/uibook/lib/components/organisms/carousel';
import RouterLink from '../../components/RouterLink/RouterLink';
import { LinkTypes } from '../../models/enum/LinkTypes';
import { getFeaturedClassPartial } from '../../utils/layout';
<<<<<<< HEAD
import { genericPageQuery_genericPage_sections as Section } from '../../../generated/genericPageQuery';
=======
import { GenericPageQuery_genericPage_sections as Section } from '../../../generated/GenericPageQuery';
>>>>>>> origin

interface IProps {
  sections: Section | null;
  title: string | null;
  body: string | null;
}

const FinanceExplainedContainer: FC<IProps> = ({ title, body, sections }) => {
  const cards = sections?.cards?.cards;
  const featured1 = sections?.featured1;
  const carousel = sections?.carousel;
  const featured2 = sections?.featured2;

  return (
    <>
      <div className="row:title">
        <Heading size="xlarge" color="black">
          {title}
        </Heading>
      </div>
      <div className="row:text">
        <div>
          <Text color="darker" tag="div">
            <ReactMarkdown
              source={body || ''}
              disallowedTypes={['paragraph']}
              unwrapDisallowed
            />
          </Text>
        </div>
      </div>
      {!!cards?.length && (
        <div className="row:bg-lighter">
          <div className="row:cards-3col">
            {cards.map((el, indx) => (
              <Card
                key={`${el.name}_${indx.toString()}`}
                title={{
                  title: el.title || '',
                }}
                description={el.body || ''}
              >
                <RouterLink
                  link={{
                    href: el.link?.url || '',
                    label: el.link?.text || '',
                    linkType: el.link?.url?.match('http')
                      ? LinkTypes.external
                      : '',
                  }}
                  classNames={{ color: 'teal' }}
                />
              </Card>
            ))}
          </div>
        </div>
      )}
      {featured1 && (
        <div className={`row:${getFeaturedClassPartial(featured1)}`}>
          <div>
            <Heading color="black" size="lead">
              {featured1.title}
            </Heading>
            <Text color="darker" size="regular" tag="div">
              <ReactMarkdown
                source={featured1.body || ''}
                disallowedTypes={['paragraph']}
                unwrapDisallowed
              />
            </Text>
          </div>
          {featured1.image?.file?.url && (
            <Image
              src={featured1.image?.file?.url}
              alt={featured1.image?.file?.fileName}
            />
          )}
        </div>
      )}
      {carousel?.cards?.length && (
        <div className="row:bg-lighter ">
          <div className="row:carousel">
            <Carousel countItems={carousel?.cards?.length || 0}>
              {carousel?.cards.map(el => (
                <Card
                  imageSrc={el?.image?.file?.url || ''}
                  title={{
                    title: el?.title || '',
                    withBtn: true,
                    link: (
                      <RouterLink
                        link={{
                          href: el?.link?.url || '',
                          label: el?.link?.text || '',
                          linkType: el?.link?.url?.match('http')
                            ? LinkTypes.external
                            : '',
                        }}
                      />
                    ),
                  }}
                />
              ))}
            </Carousel>
          </div>
        </div>
      )}
      {featured2 && (
        <div className={`row:${getFeaturedClassPartial(featured2)}`}>
          <div>
            <Heading color="black" size="large" tag="h3">
              {featured2.title}
            </Heading>
            <Text color="darker" size="regular" tag="p">
              <ReactMarkdown
                source={featured2.body || ''}
                disallowedTypes={['paragraph']}
                unwrapDisallowed
              />
            </Text>
          </div>
          {featured2.cards && featured2.cards.length && (
            <IvanCta
              title={featured2.cards[0]?.title || ''}
              body={featured2.cards[0]?.body || ''}
              imageSrc={featured2.cards[0]?.image?.file?.url || ''}
            >
              <RouterLink
                link={{
                  href: featured2.cards[0]?.link?.url || '',
                  label: featured2.cards[0]?.link?.text || '',
                  linkType: featured2.cards[0]?.link?.url?.match('http')
                    ? LinkTypes.external
                    : '',
                }}
                classNames={{ color: 'teal' }}
              />
            </IvanCta>
          )}
        </div>
      )}
    </>
  );
};

export default FinanceExplainedContainer;
