/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { useProductCardDataLazyQuery } from '../CustomerAlsoViewedContainer/gql';
import { useVehiclesList } from './gql';
import {
  vehicleList_vehicleList_edges as IVehicles,
  vehicleList as IVehiclesData,
} from '../../../generated/vehicleList';
import {
  VehicleTypeEnum,
  SortField,
  LeaseTypeEnum,
  SortDirection,
} from '../../../generated/globalTypes';
import {
  GetProductCard_productCard as IProductCard,
  GetProductCard,
} from '../../../generated/GetProductCard';
import { GetDerivatives_derivatives } from '../../../generated/GetDerivatives';
import { bodyStyleList_bodyStyleList as IModelsData } from '../../../generated/bodyStyleList';
import { bodyUrlsSlugMapper, fuelMapper } from './helpers';
import { getLegacyUrl } from '../../utils/url';
import Skeleton from '../../components/Skeleton';
import VehicleCard from './VehicleCard';
import ModelCard from './ModelCard';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Carousel = dynamic(() => import('core/organisms/carousel'), {
  loading: () => <Skeleton count={5} />,
});

interface IProps {
  isPersonal: boolean;
  isCarSearch: boolean;
  isMakePage: boolean;
  isBodyPage: boolean;
  isSpecialOfferPage: boolean;
  isPickups: boolean;
  isRangePage: boolean;
  isTransmissionPage: boolean;
  isFuelPage: boolean;
  isBudgetPage: boolean;
  isDynamicFilterPage: boolean;
  manualBodyStyle: string[];
  preLoadVehiclesList?: IVehiclesData;
  preLoadProductCardsData?: GetProductCard;
  preLoadResponseCapIds?: string[];
  preloadBodyStyleList?: IModelsData[];
  preloadMake?: string;
  preloadRange?: string;
}

const TopOffersContainer: React.FC<IProps> = ({
  isCarSearch,
  isMakePage,
  isBodyPage,
  isSpecialOfferPage,
  isTransmissionPage,
  isPickups,
  isRangePage,
  isPersonal,
  isFuelPage,
  isDynamicFilterPage,
  preLoadVehiclesList,
  preLoadProductCardsData,
  preloadBodyStyleList,
  preloadMake,
  preloadRange,
}: IProps) => {
  const router = useRouter();

  const [vehiclesList, setVehicleList] = useState(
    preLoadVehiclesList?.vehicleList.edges || ([] as any),
  );
  const [bodyStyleList] = useState(
    (preloadBodyStyleList as IModelsData[]) || [],
  );

  const [capIds, setCapsIds] = useState([] as string[]);

  const [cardsData, setCardsData] = useState(
    preLoadProductCardsData?.productCard || ([] as (IProductCard | null)[]),
  );

  const [carDer, setCarDerivatives] = useState(
    preLoadProductCardsData?.derivatives ||
      ([] as (GetDerivatives_derivatives | null)[]),
  );

  const [getProductCardData] = useProductCardDataLazyQuery(
    capIds,
    isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV,
    data => {
      setCardsData(data?.productCard || []);
      setCarDerivatives(data?.derivatives || []);
    },
  );

  // get Caps ids for product card request
  const getCapsIds = (data: (IVehicles | null)[]) =>
    data.map(vehicle => vehicle?.node?.derivativeId || '') || [];

  // using onCompleted callback for request card data after vehicle list was loaded
  const [getVehicles] = useVehiclesList(
    isCarSearch ? [VehicleTypeEnum.CAR] : [VehicleTypeEnum.LCV],
    isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS,
    true,
    async vehicles => {
      try {
        const responseCapIds = getCapsIds(vehicles.vehicleList?.edges || []);
        setVehicleList(vehicles.vehicleList.edges);
        setCapsIds(responseCapIds);
        if (responseCapIds.length) {
          return await getProductCardData({
            variables: {
              capIds: responseCapIds,
              vehicleType: isCarSearch
                ? VehicleTypeEnum.CAR
                : VehicleTypeEnum.LCV,
            },
          });
        }
        return false;
      } catch (exc) {
        return false;
      }
    },
    isMakePage ? 6 : 3,
    undefined,
    isPickups ? ['Pickup'] : [],
  );

  // using for get vehicles for carousel when we switching between pages by header links
  useEffect(() => {
    if (
      (isMakePage || isDynamicFilterPage) &&
      router.query.isChangePage === 'true'
    ) {
      getVehicles({
        variables: {
          vehicleTypes: isCarSearch
            ? [VehicleTypeEnum.CAR]
            : [VehicleTypeEnum.LCV],
          leaseType: isPersonal
            ? LeaseTypeEnum.PERSONAL
            : LeaseTypeEnum.BUSINESS,
          onOffer: true,
          sortField: SortField.offerRanking,
          sortDirection: SortDirection.ASC,
          manufacturerSlug: isMakePage
            ? (router.query?.dynamicParam as string).toLowerCase()
            : undefined,
          bodyStyles: isBodyPage
            ? [
                bodyUrlsSlugMapper[
                  router.query?.dynamicParam as keyof typeof bodyUrlsSlugMapper
                ],
              ]
            : undefined,
          transmissions: isTransmissionPage
            ? [router.query?.dynamicParam as string]
            : undefined,
          fuelTypes: isFuelPage
            ? (fuelMapper[
                router.query.dynamicParam as keyof typeof fuelMapper
              ] as string).split(',')
            : undefined,
          first: 6,
        },
      });
    }
  }, [
    router,
    isFuelPage,
    isCarSearch,
    isMakePage,
    isBodyPage,
    isTransmissionPage,
    isDynamicFilterPage,
    getVehicles,
    isPersonal,
  ]);

  const getCardData = (capId: string, dataForCards = cardsData) =>
    dataForCards?.filter(card => card?.capId === capId)[0];

  const renderVehicleCard = (vehicle: IVehicles) => (
    <VehicleCard
      loadImage
      derivativeId={vehicle.node?.derivativeId}
      url={getLegacyUrl(vehiclesList, vehicle.node?.derivativeId)}
      key={vehicle?.node?.derivativeId + vehicle?.cursor || ''}
      data={
        getCardData(vehicle.node?.derivativeId || '', cardsData) as IProductCard
      }
      title={{
        title: `${vehicle.node?.manufacturerName} ${vehicle.node?.modelName}`,
        description: vehicle.node?.derivativeName || '',
      }}
      isPersonalPrice={isPersonal}
    />
  );

  return (
    <>
      {((isMakePage && vehiclesList.length > 3 && !!carDer.length) ||
        ((isSpecialOfferPage ||
          ((isRangePage || isDynamicFilterPage) && vehiclesList.length > 2)) &&
          !!vehiclesList.length &&
          !!carDer.length)) && (
        <div className="row:bg-lighter">
          <div
            className={cx({
              'row:carousel': vehiclesList.length > 3,
              'row:cards-3col': vehiclesList.length === 3,
            })}
          >
            <Heading size="large" color="black" tag="h3">
              Top Offers
            </Heading>
            {vehiclesList.length === 3 ? (
              vehiclesList.map((vehicle: IVehicles) =>
                renderVehicleCard(vehicle),
              )
            ) : (
              <Carousel
                className="-mh-auto top-offers"
                countItems={vehiclesList.length || 0}
              >
                {vehiclesList.map((vehicle: IVehicles) =>
                  renderVehicleCard(vehicle),
                )}
              </Carousel>
            )}
          </div>
        </div>
      )}
      {isRangePage && isCarSearch && bodyStyleList.length > 1 && (
        <div className="row:bg-lighter">
          <div className="row:cards-2col">
            {bodyStyleList.map(bodyStyle => (
              <ModelCard
                data={bodyStyle}
                make={preloadMake}
                range={preloadRange}
                isPersonalPrice={isPersonal}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default TopOffersContainer;
