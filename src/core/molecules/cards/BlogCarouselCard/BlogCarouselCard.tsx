import React, { FC } from 'react';
import Card from 'core/molecules/cards';
import dynamic from 'next/dynamic';
import CardLabel from 'core/molecules/cards/CardLabel';
import Flame from 'core/assets/icons/Flame';
import Heading from 'core/atoms/heading';
import RouterLink from '../../../../components/RouterLink';
import { LeaseTypeEnum } from '../../../../../generated/globalTypes';

const Price = dynamic(() => import('core/atoms/price'));

interface IBlogCarouselCard {
  leaseType: LeaseTypeEnum;
  href: string;
  isHotOffer: boolean;
  capId: string;
  deliveryTime: string;
  price: number;
  details: string;
  score: number;
  carTitle: string;
  imageSrc: string;
}

const createExtras = (deliveryTime: string, isHotOffer: boolean) => {
  const extras = [];

  if (isHotOffer) {
    extras.push(
      <CardLabel text="HOT OFFER" icon={<Flame />} className="hotOffer" />,
    );
  }

  if (deliveryTime) {
    extras.push(<CardLabel text={deliveryTime} className="transparent" />);
  }

  return extras;
};

const BlogCarouselCard: FC<IBlogCarouselCard> = props => {
  const {
    leaseType,
    href,
    deliveryTime,
    isHotOffer,
    capId,
    price,
    details,
    score,
    carTitle,
  } = props;

  const extras = createExtras(deliveryTime, isHotOffer);
  const title = {
    title: '',
    link: (
      <RouterLink
        link={{
          href,
          label: '',
        }}
        onClick={() => sessionStorage.setItem('capId', capId || '')}
        className="heading"
        classNames={{ size: 'large', color: 'black' }}
      >
        <Heading tag="span" size="large" className="-pb-100">
          {carTitle}
        </Heading>
        <Heading tag="span" size="small" color="dark">
          {details}
        </Heading>
      </RouterLink>
    ),
    score,
  };

  return (
    <Card
      {...props}
      title={title}
      alt={carTitle}
      extrasRender={extras}
      className="-blogCarouselCard"
    >
      <div className="-flex-h">
        <Price
          price={price}
          size="large"
          separator="."
          priceDescription={`Per Month ${
            leaseType === LeaseTypeEnum.PERSONAL ? 'Inc' : 'Ex'
          }.VAT`}
        />
        <RouterLink
          link={{
            href,
            label: 'View Offer',
          }}
          onClick={() => sessionStorage.setItem('capId', capId || '')}
          classNames={{ color: 'teal', solid: true, size: 'regular' }}
          className="button"
        >
          <div className="button--inner">View Offer</div>
        </RouterLink>
      </div>
    </Card>
  );
};

export default React.memo(BlogCarouselCard);
