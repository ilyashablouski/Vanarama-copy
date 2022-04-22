import React, { FC } from 'react';
import Card from 'core/molecules/cards';
import dynamic from 'next/dynamic';
import CardLabel from 'core/molecules/cards/CardLabel';
import Flame from 'core/assets/icons/Flame';
import Heading from 'core/atoms/heading';
import FreeHomeCharger from 'core/assets/icons/FreeHomeCharger';
import RouterLink from '../../../../components/RouterLink';
import { LeaseTypeEnum } from '../../../../../generated/globalTypes';
import truncateString from '../../../../utils/truncateString';
import { AVAILABILITY_LABELS } from '../../../../containers/HelpMeChooseContainer/HelpMeChooseBlocks/HelpMeChooseResult';
import { FuelTypeEnum, OnOffer } from '../../../../../entities/global';

const Price = dynamic(() => import('core/atoms/price'));

type CardDataType = {
  url: string | null;
  onOffer: boolean | null;
  capId: string | null;
  availability: number | null;
  rental: number | null;
  manufacturerName: string | null;
  modelName: string | null;
  averageRating?: number | null;
  imageUrl: string | null;
  derivativeName: string | null;
  fuelType: string | null;
};

interface IProps {
  leaseType: LeaseTypeEnum;
  cardData: CardDataType;
  cardIndex: number;
  dataUiTestIdAlias?: string;
}

const createExtras = (
  deliveryTime: string,
  isHotOffer: boolean,
  fuelType: string,
) => {
  const extras = [];

  if (isHotOffer) {
    extras.push(
      <CardLabel
        text="HOT OFFER"
        icon={<Flame />}
        className="hotOffer"
        key={0}
      />,
    );
  }

  if (fuelType === FuelTypeEnum.ELECTRIC) {
    extras.push(
      <CardLabel text="Free Home charger" icon={<FreeHomeCharger />} key={1} />,
    );
  }

  if (deliveryTime) {
    extras.push(
      <CardLabel text={deliveryTime} className="transparent" key={2} />,
    );
  }

  return extras;
};

const BlogCarouselCard: FC<IProps> = props => {
  const {
    leaseType,
    dataUiTestIdAlias,
    cardIndex,
    cardData: {
      url,
      onOffer,
      capId,
      availability,
      rental,
      manufacturerName,
      modelName,
      averageRating,
      imageUrl,
      derivativeName,
      fuelType,
    },
  } = props;

  const extras = createExtras(
    AVAILABILITY_LABELS[availability ?? ''],
    onOffer || OnOffer.FILTER_ENABLED_AND_SET_TO_FALSE,
    fuelType || '',
  );
  const title = {
    title: '',
    link: (
      <RouterLink
        link={{
          href: url || '',
          label: '',
        }}
        onClick={() => sessionStorage.setItem('capId', capId || '')}
        className="heading"
        classNames={{ size: 'large', color: 'black' }}
      >
        <Heading tag="span" size="large" className="-pb-100">
          {truncateString(`${manufacturerName} ${modelName}`)}
        </Heading>
        <Heading tag="span" size="small" color="dark">
          {derivativeName}
        </Heading>
      </RouterLink>
    ),
    score: averageRating || undefined,
  };

  return (
    <Card
      {...props}
      imageSrc={imageUrl || ''}
      title={title || ''}
      alt={`${manufacturerName} ${modelName} ${derivativeName}`}
      extrasRender={extras}
      className="-blogCarouselCard"
      dataUiTestId={
        dataUiTestIdAlias ? `${dataUiTestIdAlias}-card_${cardIndex}` : undefined
      }
    >
      <div className="-flex-h">
        <Price
          price={rental}
          size="large"
          separator="."
          priceDescription={`Per Month ${
            leaseType === LeaseTypeEnum.PERSONAL ? 'Inc' : 'Ex'
          }.VAT`}
        />
        <RouterLink
          link={{
            href: url || '',
            label: 'View Offer',
          }}
          onClick={() => sessionStorage.setItem('capId', capId || '')}
          classNames={{ color: 'teal', solid: true, size: 'regular' }}
          className="button"
          dataUiTestId={
            dataUiTestIdAlias
              ? `${dataUiTestIdAlias}-view-offer_${cardIndex}`
              : undefined
          }
        >
          <div className="button--inner">View Offer</div>
        </RouterLink>
      </div>
    </Card>
  );
};

export default React.memo(BlogCarouselCard);
