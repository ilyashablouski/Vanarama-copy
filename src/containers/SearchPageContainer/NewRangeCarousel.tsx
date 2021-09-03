import React from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import ReactMarkdown from 'react-markdown/with-html';
import Heading from 'core/atoms/heading';
import CarouselSwiper from 'core/organisms/carousel';
import dynamic from 'next/dynamic';
import { SwiperSlide } from 'swiper/react';
import Skeleton from '../../components/Skeleton';
import { isServerRenderOrAppleDevice } from '../../utils/deviceType';
import RouterLink from '../../components/RouterLink';
import { GenericPageQuery_genericPage_sections_carousel } from '../../../generated/GenericPageQuery';

type NewRangeCarouselProps = {
  newCarousel: GenericPageQuery_genericPage_sections_carousel;
};

const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

const Card = dynamic(() => import('core/molecules/cards'), {
  loading: () => <Skeleton count={10} />,
});

const NewRangeCarousel: React.FC<NewRangeCarouselProps> = ({ newCarousel }) => {
  return (
    <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
      <div className="row:bg-lighter">
        <div className="row:carousel">
          <Heading size="large" color="black" tag="h3">
            {newCarousel.title}
          </Heading>
          <CarouselSwiper
            countItems={newCarousel?.cards?.length || 0}
            className="carousel-two-column -col3"
          >
            {newCarousel?.cards?.map((card, index: number) => (
              <SwiperSlide key={`${card?.name}_${index.toString()}`}>
                <Card
                  optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                  className="card__article"
                  imageSrc={
                    card?.image?.file?.url ||
                    `${process.env.HOST_DOMAIN}/vehiclePlaceholder.jpg`
                  }
                  title={{
                    title:
                      card?.link?.legacyUrl || card?.link?.url
                        ? ''
                        : card?.title || '',
                    link: (
                      <RouterLink
                        link={{
                          href: card?.link?.legacyUrl || card?.link?.url || '',
                          label: card?.title || '',
                        }}
                        className="card--link"
                        classNames={{
                          color: 'black',
                          size: 'regular',
                        }}
                      />
                    ),
                  }}
                >
                  <ReactMarkdown
                    className="markdown"
                    allowDangerousHtml
                    source={card?.body || ''}
                    renderers={{
                      link: props => {
                        const { href, children } = props;
                        return (
                          <RouterLink
                            link={{ href, label: children }}
                            classNames={{ color: 'teal' }}
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
                  <RouterLink
                    link={{
                      href: card?.link?.legacyUrl || card?.link?.url || '',
                      label: card?.link?.text || '',
                    }}
                    classNames={{ color: 'teal' }}
                  />
                </Card>
              </SwiperSlide>
            ))}
          </CarouselSwiper>
        </div>
      </div>
    </LazyLoadComponent>
  );
};

export default NewRangeCarousel;
