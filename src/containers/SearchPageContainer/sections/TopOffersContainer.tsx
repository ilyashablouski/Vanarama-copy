import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { SwiperSlide } from 'swiper/react';
import { useProductCardDataLazyQuery } from '../../CustomerAlsoViewedContainer/gql';
import { useVehiclesList } from '../gql';
import {
  vehicleList_vehicleList_edges as IVehicles,
  vehicleList as IVehiclesData,
} from '../../../../generated/vehicleList';
import {
  VehicleTypeEnum,
  SortField,
  LeaseTypeEnum,
  SortDirection,
} from '../../../../generated/globalTypes';
import {
  GetProductCard_productCard as IProductCard,
  GetProductCard,
} from '../../../../generated/GetProductCard';
import { GetDerivatives_derivatives } from '../../../../generated/GetDerivatives';
import { bodyStyleList_bodyStyleList as IModelsData } from '../../../../generated/bodyStyleList';
import { bodyUrlsSlugMapper, budgetMapper, fuelMapper } from '../helpers';
import { getLegacyUrl } from '../../../utils/url';
import { useDesktopViewport } from '../../../hooks/useMediaQuery';
import Skeleton from '../../../components/Skeleton';
import VehicleCard from '../../../components/VehicleCard';
import ModelCard from '../components/ModelCard';
import { Nullable } from '../../../types/common';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const CarouselSwiper = dynamic(
  () => import('core/organisms/carousel/CarouselSwiper'),
  {
    loading: () => <Skeleton count={5} />,
  },
);

interface IProps {
  isPersonal: boolean;
  isCarSearch: boolean;
  isManufacturerPage: boolean;
  isBodyPage: boolean;
  isSpecialOfferPage: boolean;
  isPickups: boolean;
  isRangePage: boolean;
  isTransmissionPage: boolean;
  isFuelPage: boolean;
  isBudgetPage: boolean;
  isDynamicFilterPage: boolean;
  preLoadVehiclesList?: Nullable<IVehiclesData>;
  preLoadProductCardsData?: Nullable<GetProductCard>;
  preloadBodyStyleList?: Nullable<IModelsData[]>;
  preloadManufacturer?: string;
  preloadRange?: string;
  shouldForceUpdate: boolean;
  setShouldForceUpdate: (value: boolean) => void;
  dataUiTestId?: string;
}

const SLIDES_PER_VIEW = 3;

const TopOffersContainer: React.FC<IProps> = ({
  isCarSearch,
  isManufacturerPage,
  isBodyPage,
  isBudgetPage,
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
  preloadManufacturer,
  preloadRange,
  shouldForceUpdate,
  setShouldForceUpdate,
  dataUiTestId,
}: IProps) => {
  const router = useRouter();

  const isDesktopLayout = useDesktopViewport();

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
          return getProductCardData({
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
    isManufacturerPage ? 6 : 9,
    undefined,
    isPickups ? ['Pickup'] : [],
  );

  // using for get vehicles for carousel when we switching between pages by header links
  useEffect(() => {
    if ((isManufacturerPage || isDynamicFilterPage) && shouldForceUpdate) {
      getVehicles({
        variables: {
          vehicleTypes: isCarSearch
            ? [VehicleTypeEnum.CAR]
            : [VehicleTypeEnum.LCV],
          leaseType: isPersonal
            ? LeaseTypeEnum.PERSONAL
            : LeaseTypeEnum.BUSINESS,
          onOffer: true,
          sort: [
            { field: SortField.offerRanking, direction: SortDirection.ASC },
          ],
          rate: isBudgetPage
            ? {
                min:
                  parseInt(
                    budgetMapper[
                      router.query.dynamicParam as keyof typeof budgetMapper
                    ].split('|')[0],
                    10,
                  ) || undefined,
                max:
                  parseInt(
                    budgetMapper[
                      router.query.dynamicParam as keyof typeof budgetMapper
                    ].split('|')[1],
                    10,
                  ) || undefined,
              }
            : undefined,
          manufacturerSlug: isManufacturerPage
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
          first: isManufacturerPage ? 6 : 9,
        },
      });
      setShouldForceUpdate(false);
    }
  }, [
    shouldForceUpdate,
    isFuelPage,
    isCarSearch,
    isManufacturerPage,
    isBodyPage,
    isTransmissionPage,
    isDynamicFilterPage,
    getVehicles,
    isPersonal,
    router.query,
    setShouldForceUpdate,
    isBudgetPage,
  ]);

  const getCardData = (capId: string, dataForCards = cardsData) =>
    dataForCards?.filter(card => card?.capId === capId)[0];

  const renderVehicleCard = (vehicle: IVehicles, index: number) => (
    <SwiperSlide key={vehicle?.node?.derivativeId + vehicle?.cursor || ''}>
      <VehicleCard
        dataUiTestId={`${dataUiTestId}_product-card-${index}`}
        loadImage
        lazyLoad={index !== 0}
        derivativeId={vehicle.node?.derivativeId}
        url={getLegacyUrl(vehiclesList, vehicle.node?.derivativeId)}
        data={
          getCardData(
            vehicle.node?.derivativeId || '',
            cardsData,
          ) as IProductCard
        }
        title={{
          title: `${vehicle.node?.manufacturerName} ${vehicle.node?.modelName}`,
          description: vehicle.node?.derivativeName || '',
        }}
        isPersonalPrice={isPersonal}
      />
    </SwiperSlide>
  );

  const carouselDisableNavigation =
    vehiclesList.length <= SLIDES_PER_VIEW && isDesktopLayout;
  const carouselLoop = vehiclesList.length > SLIDES_PER_VIEW;

  return (
    <>
      {((isManufacturerPage && vehiclesList.length > 3 && !!carDer.length) ||
        ((isSpecialOfferPage ||
          ((isRangePage || isDynamicFilterPage) && vehiclesList.length > 2)) &&
          !!vehiclesList.length &&
          !!carDer.length)) && (
        <div className="row:bg-lighter">
          <div className="row:carousel">
            <Heading size="large" color="black" tag="h3">
              Hot Offers
            </Heading>
            <CarouselSwiper
              watchOverflow
              loop={carouselLoop}
              countItems={vehiclesList.length}
              disableNavigation={carouselDisableNavigation}
              className="-mh-auto top-offers"
            >
              {vehiclesList.map((vehicle: IVehicles, index: number) =>
                renderVehicleCard(vehicle, index),
              )}
            </CarouselSwiper>
          </div>
        </div>
      )}
      {isRangePage && isCarSearch && bodyStyleList.length > 1 && (
        <div className="row:bg-lighter">
          <div className="row:cards-2col">
            {bodyStyleList.map((bodyStyle, index) => (
              <ModelCard
                dataUiTestId={`${dataUiTestId}_model-card-${index}`}
                data={bodyStyle}
                key={`${bodyStyle.bodyStyle}_${bodyStyle.capId}`}
                manufacturer={preloadManufacturer}
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
