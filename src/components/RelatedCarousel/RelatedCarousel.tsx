import React, { useMemo } from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { SwiperSlide } from 'swiper/react';
import ReactMarkdown from 'react-markdown/with-html';
import dynamic from 'next/dynamic';

import cx from 'classnames';
import { IBaseProps } from 'core/interfaces/base';
import { GenericPageQuery_genericPage_sections_carousel_cards as ICarouselCard } from '../../../generated/GenericPageQuery';
import { isServerRenderOrAppleDevice } from '../../utils/deviceType';

import RouterLink from '../RouterLink';
import Skeleton from '../Skeleton';
import Pagination from '../BlogCarousel/Pagination';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={2} />,
});

const CarouselSwiper = dynamic(
  () => import('core/organisms/carousel/CarouselSwiper'),
  {
    loading: () => <Skeleton count={5} />,
  },
);

const Card = dynamic(() => import('core/molecules/cards'), {
  loading: () => <Skeleton count={10} />,
});

interface IProps extends IBaseProps {
  cards: (ICarouselCard | null)[] | null;
  title: Nullable<string>;
  renderNewPagination?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const renderCarouselSlide = (card: ICarouselCard, dataUiTestId?: string) => (
  <SwiperSlide key={card.name}>
    <Card
      dataUiTestId={dataUiTestId ? `${dataUiTestId}_card` : undefined}
      optimisedHost={process.env.IMG_OPTIMISATION_HOST}
      className="card__article"
      imageSrc={
        card?.image?.file?.url ||
        `${process.env.HOST_DOMAIN}/vehiclePlaceholder.jpg`
      }
      title={{
        title: card.link?.legacyUrl || card.link?.url ? '' : card.title || '',
        link: (
          <RouterLink
            link={{
              href: card.link?.legacyUrl || card.link?.url || '',
              label: card.title || '',
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
        source={card.body ?? ''}
        allowDangerousHtml
      />
      <RouterLink
        link={{
          href: card.link?.legacyUrl || card.link?.url || '',
          label: card.link?.text || '',
        }}
        classNames={{ color: 'teal' }}
        dataUiTestId={
          dataUiTestId ? `${dataUiTestId}_read-more_link` : undefined
        }
      />
    </Card>
  </SwiperSlide>
);

const RelatedCarousel = ({
  cards,
  title,
  renderNewPagination,
  className,
  dataUiTestId,
  children,
}: IProps) => {
  const resultCards = useMemo(
    () => cards?.filter(item => !!item) as ICarouselCard[],
    [cards],
  );

  return (
    <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
      <div className="row:bg-lighter">
        <div className="row:carousel">
          {title && (
            <Heading
              size="large"
              color="black"
              tag="h3"
              dataUiTestId={
                dataUiTestId ? `${dataUiTestId}_heading` : undefined
              }
            >
              {title}
            </Heading>
          )}
          <CarouselSwiper
            countItems={resultCards.length}
            className={cx('-col3', className)}
            paginationComponent={
              renderNewPagination ? <Pagination /> : undefined
            }
            dataUiTestId={dataUiTestId}
          >
            {resultCards.map((item, index) =>
              renderCarouselSlide(item, `${dataUiTestId}_${index}`),
            )}
          </CarouselSwiper>
          {children}
        </div>
      </div>
    </LazyLoadComponent>
  );
};

export default RelatedCarousel;
