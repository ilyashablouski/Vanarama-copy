import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown';
import RouterLink from '../../components/RouterLink/RouterLink';
import { getFeaturedClassPartial } from '../../utils/layout';
import {
  GenericPageQuery,
  GenericPageQuery_genericPage_sections_cards_cards as Cards,
  GenericPageQuery_genericPage_sections_carousel as CarouselData,
} from '../../../generated/GenericPageQuery';
import getTitleTag from '../../utils/getTitleTag';
import { getSectionsData } from '../../utils/getSectionsData';
import Skeleton from '../../components/Skeleton';

const Card = dynamic(
  () => import('@vanarama/uibook/lib/components/molecules/cards'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Heading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/heading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Text = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/text'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Image = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/image'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const IvanCta = dynamic(
  () => import('@vanarama/uibook/lib/components/molecules/ivan-cta'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Carousel = dynamic(
  () => import('@vanarama/uibook/lib/components/organisms/carousel'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

interface IProps {
  data: GenericPageQuery;
}

const FinanceExplainedContainer: FC<IProps> = ({ data }) => {
  const title = getSectionsData(['metaData', 'name'], data?.genericPage);
  const body = getSectionsData(['body'], data?.genericPage);
  const cards = getSectionsData(
    ['sections', 'cards', 'cards'],
    data?.genericPage,
  );
  const featured1 = getSectionsData(
    ['sections', 'featured1'],
    data?.genericPage,
  );
  const carousel: CarouselData = getSectionsData(
    ['sections', 'carousel'],
    data?.genericPage,
  );
  const featured2 = getSectionsData(
    ['sections', 'featured2'],
    data?.genericPage,
  );

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
            allowDangerousHtml
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
                  cards?.titleTag || null,
                ) as keyof JSX.IntrinsicElements
              }
            >
              {cards?.name}
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
                    href: el.link?.legacyUrl || el.link?.url || '',
                    label: el.link?.text || '',
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
            featured1.layout
              ? `row:${getFeaturedClassPartial(featured1)}`
              : 'row:text -columns'
          }
        >
          <div>
            <Heading
              color="black"
              size="lead"
              className="-mb-400"
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
                className="markdown"
                source={featured1.body || ''}
                allowDangerousHtml
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
                    return <ol>{children}</ol>;
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
                    btnClick: () =>
                      Router.push(el?.link?.legacyUrl || el?.link?.url || ''),
                    link: (
                      <RouterLink
                        link={{
                          href: el?.link?.legacyUrl || el?.link?.url || '',
                          label: el?.link?.text || '',
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
                      allowDangerousHtml
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
                  href:
                    featured2.cards[0]?.link?.legacyUrl ||
                    featured2.cards[0]?.link?.url ||
                    '',
                  label: featured2.cards[0]?.link?.text || '',
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
                allowDangerousHtml
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
