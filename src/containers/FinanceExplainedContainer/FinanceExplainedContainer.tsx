import React, { FC } from 'react';
import Router from 'next/router';
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
import {
  GenericPageQuery_genericPage_sections as Section,
  GenericPageQuery_genericPage_sections_cards_cards as Cards,
} from '../../../generated/GenericPageQuery';
import getTitleTag from '../../utils/getTitleTag';
import { getSectionsData } from '../../utils/getSectionsData';

interface IProps {
  sections: Section | null;
  title: string | null;
  body: string | null;
}

const FinanceExplainedContainer: FC<IProps> = ({ title, body, sections }) => {
  const cards = getSectionsData(['cards', 'cards'], sections);
  const featured1 = sections?.featured1;
  const carousel = sections?.carousel;
  const featured2 = sections?.featured2;

  return (
    <>
      <div className="row:title">
        <Heading size="xlarge" color="black" tag="h1">
          {title}
        </Heading>
      </div>
      <div className="row:text -columns">
        <div>
          <ReactMarkdown
            source={body || ''}
            escapeHtml={false}
            renderers={{
              link: props => {
                const { href, children } = props;
                return (
                  <RouterLink
                    classNames={{ color: 'teal' }}
                    link={{ href, label: children }}
                  />
                );
              },
              heading: props => (
                <Text {...props} size="lead" color="darker" tag="h3" />
              ),
              paragraph: props => <Text {...props} tag="p" color="darker" />,
            }}
          />
        </div>
      </div>
      {!!cards?.length && (
        <div className="row:bg-lighter">
          <div className="row:cards-3col">
            <Heading
              color="black"
              size="lead"
              tag={
                getTitleTag(
                  sections?.cards?.titleTag || null,
                ) as keyof JSX.IntrinsicElements
              }
            >
              {sections?.cards?.name}
            </Heading>
            {cards.map((el: Cards, indx: number) => (
              <Card
                optimisedHost={process.env.IMG_OPTIMISATION_HOST}
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
        <div
          className={
            featured1.image?.file?.url
              ? `row:${getFeaturedClassPartial(featured1)}`
              : 'row:text -columns'
          }
        >
          <div>
            <Heading
              color="black"
              size="lead"
              tag={
                getTitleTag(
                  featured1.titleTag || null,
                ) as keyof JSX.IntrinsicElements
              }
            >
              {featured1.title}
            </Heading>
            <div>
              <ReactMarkdown
                source={featured1.body || ''}
                escapeHtml={false}
                renderers={{
                  link: props => {
                    const { href, children } = props;
                    return (
                      <RouterLink
                        classNames={{ color: 'teal' }}
                        link={{ href, label: children }}
                      />
                    );
                  },
                  heading: props => (
                    <Text {...props} size="lead" color="darker" tag="h3" />
                  ),
                  paragraph: props => (
                    <div style={{ display: 'inline-block' }}>
                      <Text {...props} tag="p" color="darker" />
                    </div>
                  ),
                  list: props => {
                    const { children } = props;
                    return <ol style={{ display: 'list-item' }}>{children}</ol>;
                  },
                  listItem: props => {
                    const { children } = props;
                    return (
                      <li
                        style={{
                          display: 'list-item',
                          listStyleType: 'decimal',
                          listStylePosition: 'inside',
                        }}
                      >
                        {children}
                      </li>
                    );
                  },
                }}
              />
            </div>
          </div>
          {featured1.image?.file?.url && (
            <Image
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
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
                  optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                  imageSrc={el?.image?.file?.url || ''}
                  title={{
                    title: el?.title || '',
                    withBtn: true,
                    btnClick: () => Router.push(el?.link?.url || ''),
                    link: (
                      <RouterLink
                        link={{
                          href: el?.link?.url || '',
                          label: el?.link?.text || '',
                          linkType: el?.link?.url?.match('http')
                            ? LinkTypes.external
                            : '',
                        }}
                        className="heading"
                        classNames={{ size: 'lead', color: 'black' }}
                      />
                    ),
                  }}
                >
                  <div>
                    <ReactMarkdown
                      source={el?.body || ''}
                      escapeHtml={false}
                      renderers={{
                        link: props => {
                          const { href, children } = props;
                          return (
                            <RouterLink
                              classNames={{ color: 'teal' }}
                              link={{ href, label: children }}
                            />
                          );
                        },
                        heading: props => (
                          <Text {...props} size="lead" color="dark" tag="h3" />
                        ),
                        paragraph: props => (
                          <Text {...props} tag="p" color="dark" />
                        ),
                      }}
                    />
                  </div>
                </Card>
              ))}
            </Carousel>
          </div>
        </div>
      )}
      {featured2 && (
        <div className={`row:${getFeaturedClassPartial(featured2)}`}>
          {featured2.cards?.length && (
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
          <div>
            <Heading
              color="black"
              size="large"
              tag={
                getTitleTag(
                  featured2.titleTag || null,
                ) as keyof JSX.IntrinsicElements
              }
            >
              {featured2.title}
            </Heading>
            <div>
              <ReactMarkdown
                source={featured2.body || ''}
                escapeHtml={false}
                renderers={{
                  link: props => {
                    const { href, children } = props;
                    return (
                      <RouterLink
                        classNames={{ color: 'teal' }}
                        link={{ href, label: children }}
                      />
                    );
                  },
                  heading: props => (
                    <Text {...props} size="lead" color="darker" tag="h3" />
                  ),
                  paragraph: props => (
                    <Text {...props} tag="p" color="darker" />
                  ),
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FinanceExplainedContainer;
