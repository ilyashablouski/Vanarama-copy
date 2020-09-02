/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Carousel from '@vanarama/uibook/lib/components/organisms/carousel';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { useProductCardData } from '../CustomerAlsoViewedContainer/gql';
import { getVehiclesList, useBodyStyleList } from './gql';
import VehicleCard, { IProductPageUrl } from './VehicleCard';
import ModelCard from './ModelCard';
import { vehicleList_vehicleList_edges as IVehicles } from '../../../generated/vehicleList';
import {
  VehicleTypeEnum,
  SortField,
  LeaseTypeEnum,
} from '../../../generated/globalTypes';
import { GetProductCard_productCard as IProductCard } from '../../../generated/GetProductCard';
import { GetDerivatives_derivatives } from '../../../generated/GetDerivatives';
import { bodyStyleList_bodyStyleList as IModelsData } from '../../../generated/bodyStyleList';
import { isBodyTransmission } from './helpers';

interface IProps {
  isPersonal: boolean;
  isCarSearch: boolean;
  isMakePage: boolean;
  isBodyPage: boolean;
  isSpecialOfferPage: boolean;
  isPickups: boolean;
  isRangePage: boolean;
  viewOffer: (productPageUrl: IProductPageUrl) => void;
  viewModel: (model: string) => void;
}

const TopOffersContainer: React.FC<IProps> = ({
  isCarSearch,
  isMakePage,
  isBodyPage,
  isSpecialOfferPage,
  isPickups,
  isRangePage,
  isPersonal,
  viewOffer,
  viewModel,
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
  const [getVehicles] = getVehiclesList(
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
    if (isMakePage || isRangePage || isBodyPage) {
      getVehicles({
        variables: {
          vehicleTypes: isCarSearch
            ? [VehicleTypeEnum.CAR]
            : [VehicleTypeEnum.LCV],
          onOffer: true,
          sortField: SortField.offerRanking,
          manufacturerName: !isBodyPage
            ? (router.query?.dynamicParam as string)
            : undefined,
          bodyStyles:
            isBodyPage &&
            !isBodyTransmission(router.query?.dynamicParam as string)
              ? [router.query?.dynamicParam as string]
              : undefined,
          transmissions:
            isBodyPage &&
            isBodyTransmission(router.query?.dynamicParam as string)
              ? [router.query?.dynamicParam as string]
              : undefined,
          rangeName: isRangePage
            ? ((router.query?.rangeName as string) || '').split('+').join(' ')
            : '',
          first: isMakePage ? 6 : 3,
        },
      });
      if (isRangePage) getBodyStylesList();
    }
    // disabled lint because we can't add router to deps
    // it's change every url replace
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    getVehicles,
    isCarSearch,
    isMakePage,
    isBodyPage,
    isSpecialOfferPage,
    isPersonal,
  ]);

  // using for get vehicles for carousel when we switching between pages by header links
  useEffect(() => {
    if ((isMakePage || isBodyPage) && router.query.isChangePage === 'true') {
      getVehicles({
        variables: {
          vehicleTypes: isCarSearch
            ? [VehicleTypeEnum.CAR]
            : [VehicleTypeEnum.LCV],
          onOffer: true,
          sortField: SortField.offerRanking,
          manufacturerName: !isBodyPage
            ? (router.query?.dynamicParam as string)
            : undefined,
          bodyStyles:
            isBodyPage &&
            !isBodyTransmission(router.query?.dynamicParam as string)
              ? [router.query?.dynamicParam as string]
              : undefined,
          transmissions:
            isBodyPage &&
            isBodyTransmission(router.query?.dynamicParam as string)
              ? [router.query?.dynamicParam as string]
              : undefined,
          first: 6,
        },
      });
    }
  }, [router, isCarSearch, isMakePage, isBodyPage, getVehicles]);

  const getCardData = (capId: string, dataForCards = cardsData) =>
    dataForCards?.filter(card => card?.capId === capId)[0];
  return (
    <>
      {((isMakePage && vehiclesList.length > 3 && !!carDer.length) ||
        ((isSpecialOfferPage ||
          ((isRangePage || isBodyPage) && vehiclesList.length > 2)) &&
          !!vehiclesList.length &&
          !!carDer.length)) && (
        <div className="row:bg-lighter">
          <div
            className={cx({
              'row:carousel': !isRangePage && !isBodyPage,
              'row:cards-3col': isRangePage || isBodyPage,
            })}
          >
            <Heading size="large" color="black" tag="h3">
              Top Offers
            </Heading>
            {isRangePage || isBodyPage ? (
              vehiclesList.map((vehicle: IVehicles) => (
                <VehicleCard
                  dataDerivatives={carDer}
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
                    dataDerivatives={carDer}
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
      <div className="row:bg-lighter">
        {isRangePage && bodyStyleList.length > 1 ? (
          <div className="row:cards-2col">
            {bodyStyleList.map(bodyStyle => (
              <ModelCard
                data={bodyStyle}
                isPersonalPrice={isPersonal}
                viewModel={viewModel}
              />
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default TopOffersContainer;
