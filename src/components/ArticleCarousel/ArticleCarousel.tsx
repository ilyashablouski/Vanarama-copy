import React from 'react';
import dynamic from 'next/dynamic';
import CarouselSwiper from 'core/organisms/carousel';
import Card from 'core/molecules/cards';
import { SwiperSlide } from 'swiper/react';
import RouterLink from '../RouterLink/RouterLink';
import { GenericPageQuery_genericPage_sectionsAsArray_carousel as ICarousel } from '../../../generated/GenericPageQuery';

const Heading = dynamic(() => import('core/atoms/heading'));

interface IEvCarouselProps {
  data: ICarousel | null | undefined;
}

const ArticleCarousel: React.FC<IEvCarouselProps> = ({ data }) => {
  return (
    <section className="row:bg-lighter">
      <div>
        <Heading color="black" size="large" className="-a-center -mb-400">
          More Articles
        </Heading>
        {data?.cards && (
          <CarouselSwiper countItems={3} className="-mh-auto about-us">
            {data.cards.map((card, index) => (
              <SwiperSlide key={card?.name || index}>
                <Card imageSrc={card?.image?.file?.url}>
                  <div className="basic">
                    <Heading tag="p" color="black" className="-mb-400">
                      {card?.body}
                    </Heading>
                    {card?.link && (
                      <RouterLink
                        className="-teal"
                        link={{
                          href: card?.link?.url || '',
                          label: card?.link?.text || '',
                        }}
                      />
                    )}
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </CarouselSwiper>
        )}
      </div>
    </section>
  );
};

export default React.memo(ArticleCarousel);
