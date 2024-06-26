import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown';
import { SwiperSlide } from 'swiper/react';
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

const Card = dynamic(() => import('core/molecules/cards'), {
  loading: () => <Skeleton count={1} />,
});
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const ImageV2 = dynamic(() => import('core/atoms/image/ImageV2'), {
  loading: () => <Skeleton count={1} />,
});
const IvanCta = dynamic(() => import('core/molecules/ivan-cta'), {
  loading: () => <Skeleton count={1} />,
});
const CarouselSwiper = dynamic(() => import('core/organisms/carousel'), {
  loading: () => <Skeleton count={1} />,
});
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
  const carousel: CarouselData = getSectionsData(
    ['sections', 'carousel'],
    data?.genericPage,
  );

  const featured1 = data?.genericPage.sections?.featured1;
  const featured1Image = featured1?.image?.file;

  const featured2 = data?.genericPage.sections?.featured2;
  const featured2FirstCardImage = featured2?.cards?.[0]?.image?.file;

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
            className="markdown"
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
            {cards.map((el: Cards, index: number) => (
              <Card
                optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                key={`${el.name}_${index.toString()}`}
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
                }}
              />
            </div>
          </div>
          {featured1Image?.url && (
            <ImageV2
              quality={60}
              width={featured1Image?.details.image.width}
              height={featured1Image?.details.image.height}
              src={featured1Image?.url}
              alt={featured1.title ?? ''}
            />
          )}
        </div>
      )}
      {carousel?.cards?.length && (
        <div className="row:bg-lighter ">
          <div className="row:carousel">
            <CarouselSwiper countItems={carousel?.cards?.length || 0}>
              {carousel?.cards.map((el, index) => (
                <SwiperSlide key={index.toString()}>
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
                        className="markdown"
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
                        }}
                      />
                    </div>
                  </Card>
                </SwiperSlide>
              ))}
            </CarouselSwiper>
          </div>
        </div>
      )}
      {featured2 && (
        <div className={`row:${getFeaturedClassPartial(featured2)}`}>
          {featured2.cards?.length && (
            <div>
              <IvanCta
                imageSrc={featured2FirstCardImage?.url || ''}
                imageWidth={featured2FirstCardImage?.details.image.width}
                imageHeight={featured2FirstCardImage?.details.image.height}
                title={featured2.cards[0]?.title || ''}
                body={featured2.cards[0]?.body || ''}
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
            </div>
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
                className="markdown"
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
