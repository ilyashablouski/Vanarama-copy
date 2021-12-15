import CarouselSwiper from 'core/organisms/carousel';
import { SwiperSlide } from 'swiper/react';
import cx from 'classnames';
import Card from 'core/molecules/cards';
import { IBaseProps } from 'core/interfaces/base';
import { memo } from 'react';
import {
  GenericPageQuery_genericPage_sections_cards_cards as Cards,
  GenericPageQuery_genericPage_sectionsAsArray_cards_cards,
} from '../../../generated/GenericPageQuery';
import RouterLink from '../RouterLink';
import Pagination from '../BlogCarousel/Pagination';

interface IProps extends IBaseProps {
  cards: GenericPageQuery_genericPage_sectionsAsArray_cards_cards[];
  dataUiTestIdMask?: string;
}

const CardsSectionCarousel: React.FC<IProps> = ({
  cards,
  dataUiTestIdMask,
  className,
}) => {
  if (cards?.length && cards?.length > 1) {
    return (
      <CarouselSwiper
        className={cx('blog-carousel -mh-auto', className)}
        countItems={cards.length || 3}
        paginationComponent={<Pagination />}
      >
        {cards.map((el: Cards, index: number) => (
          <SwiperSlide key={`_${index}` || ''}>
            {({ isDuplicate }) => (
              <Card
                optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                imageSrc={el.image?.file?.url}
                key={`${el.name}_${index.toString()}`}
                title={{
                  title: el.title || '',
                }}
                description={el.body || ''}
                dataUiTestId={isDuplicate ? undefined : dataUiTestIdMask}
              >
                <RouterLink
                  link={{
                    href: el.link?.legacyUrl || el.link?.url || '',
                    label: el.link?.text || '',
                  }}
                  className="button -w-min_content"
                  withoutDefaultClassName
                  classNames={{
                    color: 'teal',
                    solid: true,
                    size: 'regular',
                  }}
                >
                  <div className="button--inner">{el.link?.text}</div>
                </RouterLink>
              </Card>
            )}
          </SwiperSlide>
        ))}
      </CarouselSwiper>
    );
  }
  return (
    <div className="carousel -single-product -mh-auto">
      {cards?.map(
        (card, index) =>
          card && (
            <Card
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
              imageSrc={card.image?.file?.url}
              key={`${card.name}_${index.toString()}`}
              title={{
                title: card.title || '',
              }}
              description={card.body || ''}
            >
              <RouterLink
                link={{
                  href: card.link?.legacyUrl || card.link?.url || '',
                  label: card.link?.text || '',
                }}
                className="button"
                withoutDefaultClassName
                classNames={{
                  color: 'teal',
                  solid: true,
                  size: 'regular',
                }}
              >
                <div className="button--inner">{card.link?.text}</div>
              </RouterLink>
            </Card>
          ),
      )}
    </div>
  );
};

export default memo(CardsSectionCarousel);
