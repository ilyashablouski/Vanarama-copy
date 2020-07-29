/* eslint-disable @typescript-eslint/camelcase */
import React, { memo, useContext } from 'react';
import Card from '@vanarama/uibook/lib/components/molecules/cards/ProductCard/ProductCard';
import { ICardTitleProps } from '@vanarama/uibook/lib/components/molecules/cards/CardTitle';
import { TIcon } from '@vanarama/uibook/lib/components/molecules/cards/CardIcons';
import Price from '@vanarama/uibook/lib/components/atoms/price';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Flame from '@vanarama/uibook/lib/assets/icons/Flame';
import { GetProductCard_productCard as ICard } from '../../../generated/GetProductCard';
import RouterLink from '../../components/RouterLink/RouterLink';
import { getProductPageUrl } from '../../utils/url';
import { GetDerivatives_derivatives } from '../../../generated/GetDerivatives';
import {
  changeCompares,
  isCorrectCompareType,
  IVehicle,
} from '../../utils/helpers';
import { CompareContext } from '../../pages/_app';

export interface IProductPageUrl {
  url: string;
  href: string;
  capId: string;
}

interface IVehicleCardProps {
  title: ICardTitleProps;
  isPersonalPrice: boolean;
  data: ICard;
  viewOffer: (productPageUrl: IProductPageUrl) => void;
  dataDerivatives: (GetDerivatives_derivatives | null)[];
  onCompare: (data: ICard) => void;
  compared?: boolean;
  bodyStyle?: string | null | undefined;
}

const VehicleCard = memo(
  ({
    title,
    isPersonalPrice,
    data,
    dataDerivatives,
    viewOffer,
    bodyStyle,
  }: IVehicleCardProps) => {
    const {
      compareVehicles,
      setCompareVehicles,
      setModalCompareTypeError,
    } = useContext(CompareContext);

    const features = (keyInformation: any[]): TIcon[] => {
      return keyInformation.map(information => ({
        icon: <Icon name={information.name.replace(' ', '')} color="dark" />,
        label: information.value,
      }));
    };

    const productPageUrl = getProductPageUrl(
      data,
      dataDerivatives as GetDerivatives_derivatives[],
    );

    return (
      <Card
        description="Minim consectetur adipisicing aute consequat velit exercitation enim deserunt occaecat sit ut incididunt dolor id"
        imageSrc={data?.imageUrl || ''}
        header={{
          accentIcon: data?.isOnOffer ? (
            <Icon icon={<Flame />} color="white" className="md hydrated" />
          ) : null,
          accentText: data?.isOnOffer ? 'Hot Deal' : '',
          text: data?.leadTime || '',
        }}
        onCompare={async () => {
          if (isCorrectCompareType({ ...data, bodyStyle }, compareVehicles)) {
            const compares = await changeCompares({ ...data, bodyStyle });
            setCompareVehicles(compares);
          } else {
            setModalCompareTypeError(true);
          }
        }}
        compared={compareVehicles.some(
          vehicle => `${vehicle.capId}` === `${data.capId}`,
        )}
        onWishlist={() => {}}
        features={features(data?.keyInformation || [])}
        title={{
          ...title,
          score: data?.averageRating || undefined,
          link: (
            <RouterLink
              link={{
                href: productPageUrl.href,
                label: `${data?.manufacturerName} ${data?.rangeName}`,
              }}
              as={productPageUrl.url}
              onClick={() => {
                sessionStorage.setItem('capId', data.capId || '');
              }}
              className="heading"
              classNames={{ size: 'large', color: 'black' }}
            />
          ),
        }}
      >
        <div className="-flex-h">
          <Price
            price={isPersonalPrice ? data?.personalRate : data?.businessRate}
            size="large"
            separator="."
            priceDescription={`Per Month ${
              isPersonalPrice ? 'Inc' : 'Exc'
            }.VAT`}
          />
          <Button
            color="teal"
            fill="solid"
            label="View Offer"
            onClick={() => viewOffer(productPageUrl)}
            size="regular"
          />
        </div>
      </Card>
    );
  },
);

export default VehicleCard;
