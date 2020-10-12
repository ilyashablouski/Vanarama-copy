/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Carousel from '@vanarama/uibook/lib/components/organisms/carousel';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { useProductCardData } from '../CustomerAlsoViewedContainer/gql';
import { useVehiclesList, useBodyStyleList } from './gql';
import VehicleCard, { IProductPageUrl } from './VehicleCard';
import ModelCard from './ModelCard';
import { vehicleList_vehicleList_edges as IVehicles } from '../../../generated/vehicleList';
import {
  VehicleTypeEnum,
  SortField,
  LeaseTypeEnum,
  SortDirection,
} from '../../../generated/globalTypes';
import { GetProductCard_productCard as IProductCard } from '../../../generated/GetProductCard';
import { GetDerivatives_derivatives } from '../../../generated/GetDerivatives';
import { bodyStyleList_bodyStyleList as IModelsData } from '../../../generated/bodyStyleList';
import { fuelMapper } from './helpers';
import { getLegacyUrl, getNewUrl } from '../../utils/url';

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
  isDynamicFilterPage: boolean;
  viewOffer: (productPageUrl: IProductPageUrl) => void;
  viewModel: (model: string) => void;
  manualBodyStyle: string[];
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
  viewOffer,
  viewModel,
  isDynamicFilterPage,
  manualBodyStyle,
}: IProps) => {
  const router = useRouter();

  const [vehiclesList, setVehicleList] = useState([] as any);
  const [bodyStyleList, setBodyStyleList] = useState([] as IModelsData[]);

  const [capIds, setCapsIds] = useState([] as string[]);

  const [cardsData, setCardsData] = useState([] as (IProductCard | null)[]);

  const [carDer, setCarDerivatives] = useState(
    [] as (GetDerivatives_derivatives | null)[],
  );

  const { refetch } = useProductCardData(
    capIds,
    isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV,
    true,
  );

  // get Caps ids for product card request
  const getCapsIds = (data: (IVehicles | null)[]) =>
    data.map(vehicle => vehicle?.node?.derivativeId || '') || [];

  // using onCompleted callback for request card data after vehicle list was loaded
  const [getVehicles] = useVehiclesList(
    isCarSearch ? [VehicleTypeEnum.CAR] : [VehicleTypeEnum.LCV],
    true,
    async vehicles => {
      try {
        const responseCapIds = getCapsIds(vehicles.vehicleList?.edges || []);
        setVehicleList(vehicles.vehicleList.edges);
        setCapsIds(responseCapIds);
        if (responseCapIds.length) {
          return await refetch({
            capIds: responseCapIds,
            vehicleType: isCarSearch
              ? VehicleTypeEnum.CAR
              : VehicleTypeEnum.LCV,
          }).then(resp => {
            setCardsData(resp.data?.productCard || []);
            setCarDerivatives(resp.data?.derivatives || []);
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

  // using onCompleted callback for request card data after vehicle list was loaded
  const [getBodyStylesList, { data }] = useBodyStyleList(
    isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV,
    isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS,
    router.query.dynamicParam as string,
    ((router.query?.rangeName as string) || '').split('+').join(' '),
  );

  useEffect(() => {
    if (data?.bodyStyleList) {
      setBodyStyleList(data.bodyStyleList);
    }
  }, [data]);

  // API call after load new pages
  useEffect(() => {
    if (isSpecialOfferPage) getVehicles();
    if (isMakePage || isRangePage || isDynamicFilterPage) {
      getVehicles({
        variables: {
          vehicleTypes: isCarSearch
            ? [VehicleTypeEnum.CAR]
            : [VehicleTypeEnum.LCV],
          onOffer: true,
          sortField: SortField.offerRanking,
          sortDirection: SortDirection.ASC,
          manufacturerName:
            isMakePage || isRangePage
              ? (router.query?.dynamicParam as string)
              : undefined,
          bodyStyles: isBodyPage ? manualBodyStyle : undefined,
          transmissions: isTransmissionPage
            ? [router.query?.dynamicParam as string]
            : undefined,
          fuelTypes: isFuelPage
            ? (fuelMapper[
                router.query.dynamicParam as keyof typeof fuelMapper
              ] as string).split(',')
            : undefined,
          rangeName: isRangePage
            ? ((router.query?.rangeName as string) || '').split('+').join(' ')
            : '',
          first: isMakePage ? 6 : 3,
        },
      });
      if (isRangePage && isCarSearch) getBodyStylesList();
    }
    // disabled lint because we can't add router to deps
    // it's change every url replace
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    getVehicles,
    isCarSearch,
    isMakePage,
    isBodyPage,
    isTransmissionPage,
    isSpecialOfferPage,
    isDynamicFilterPage,
    isFuelPage,
    isPersonal,
    manualBodyStyle,
  ]);

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
          onOffer: true,
          sortField: SortField.offerRanking,
          sortDirection: SortDirection.ASC,
          manufacturerName: isMakePage
            ? (router.query?.dynamicParam as string)
            : undefined,
          bodyStyles: isBodyPage
            ? [router.query?.dynamicParam as string]
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
  ]);

  const getCardData = (capId: string, dataForCards = cardsData) =>
    dataForCards?.filter(card => card?.capId === capId)[0];
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
              'row:carousel': !isRangePage && !isDynamicFilterPage,
              'row:cards-3col': isRangePage || isDynamicFilterPage,
            })}
          >
            <Heading size="large" color="black" tag="h3">
              Top Offers
            </Heading>
            {isRangePage || isDynamicFilterPage ? (
              vehiclesList.map((vehicle: IVehicles) => (
                <VehicleCard
                  derivativeId={vehicle.node?.derivativeId}
                  url={getLegacyUrl(vehiclesList, vehicle.node?.derivativeId)}
                  appUrl={getNewUrl(vehiclesList, vehicle.node?.derivativeId)}
                  viewOffer={viewOffer}
                  key={vehicle?.node?.derivativeId + vehicle?.cursor || ''}
                  data={
                    getCardData(
                      vehicle.node?.derivativeId || '',
                      cardsData,
                    ) as IProductCard
                  }
                  title={{
                    title: '',
                    description: vehicle.node?.derivativeName || '',
                  }}
                  isPersonalPrice={isPersonal}
                />
              ))
            ) : (
              <Carousel
                className="-mh-auto"
                countItems={vehiclesList.length || 0}
              >
                {vehiclesList.map((vehicle: IVehicles) => (
                  <VehicleCard
                    derivativeId={vehicle.node?.derivativeId}
                    url={getLegacyUrl(vehiclesList, vehicle.node?.derivativeId)}
                    appUrl={getNewUrl(vehiclesList, vehicle.node?.derivativeId)}
                    viewOffer={viewOffer}
                    key={vehicle?.node?.derivativeId + vehicle?.cursor || ''}
                    data={
                      getCardData(
                        vehicle.node?.derivativeId || '',
                        cardsData,
                      ) as IProductCard
                    }
                    title={{
                      title: '',
                      description: vehicle.node?.derivativeName || '',
                    }}
                    isPersonalPrice={isPersonal}
                  />
                ))}
              </Carousel>
            )}
          </div>
        </div>
      )}
      <>
        {isRangePage && isCarSearch && bodyStyleList.length > 1 ? (
          <div className="row:bg-lighter">
            <div className="row:cards-2col">
              {bodyStyleList.map(bodyStyle => (
                <ModelCard
                  data={bodyStyle}
                  isPersonalPrice={isPersonal}
                  viewModel={viewModel}
                />
              ))}
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    </>
  );
};

export default TopOffersContainer;
