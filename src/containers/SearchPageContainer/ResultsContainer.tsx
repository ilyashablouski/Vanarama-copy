import React, { memo, useCallback, useContext } from 'react';
import { useRouter } from 'next/router';
import RangeCard from './RangeCard';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import { vehicleList_vehicleList_edges as IVehicles } from '../../../generated/vehicleList';
import { GetProductCard_productCard as IProductCard } from '../../../generated/GetProductCard';
import VehicleCard from '../../components/VehicleCard';
import { rangeList } from '../../../generated/rangeList';
import { genericPagesQuery_genericPages as IGenericPages } from '../../../generated/genericPagesQuery';
import { manufacturerList } from '../../../generated/manufacturerList';
import { Nullable } from '../../types/common';
import {
  isManufacturerMigrated,
  ManufacturersSlugContext,
} from '../../utils/url';

const getUrlForVehicleCard = (
  vehicle: IVehicles,
  migratedManufacturers: string[],
) =>
  vehicle.node?.manufacturerName === 'Abarth' ||
  isManufacturerMigrated(
    migratedManufacturers,
    vehicle.node?.manufacturerName || '',
  )
    ? vehicle.node?.url
    : vehicle.node?.legacyUrl || vehicle.node?.url; // return slug if legacy url is not exists

interface IProps {
  isManufacturerPage?: boolean;
  isAllManufacturersPage?: boolean;
  ranges: rangeList;
  isPersonal?: boolean;
  rangesUrls?: IGenericPages['items'];
  isCarSearch?: boolean;
  manufacturers: manufacturerList;
  manufacturersUrls?: IGenericPages['items'];
  cardsData: Nullable<IProductCard>[];
  vehiclesList: any;
  isModelPage?: boolean;
  customCTAColor?: string;
  dataUiTestId?: string;
}

const ResultsContainer = memo(
  ({
    isManufacturerPage,
    isAllManufacturersPage,
    ranges,
    isPersonal,
    rangesUrls,
    isCarSearch,
    manufacturers,
    manufacturersUrls,
    cardsData,
    vehiclesList,
    isModelPage,
    customCTAColor,
    dataUiTestId,
  }: IProps) => {
    const router = useRouter();

    const { vehicles } = useContext(ManufacturersSlugContext);

    const getCardData = useCallback(
      (capId: string, dataForCards = cardsData) =>
        (dataForCards as Nullable<IProductCard>[])?.filter(
          card => card?.capId === capId,
        )[0],
      [cardsData],
    );

    return isManufacturerPage || isAllManufacturersPage ? (
      <>
        {isManufacturerPage &&
          !!ranges?.rangeList?.length &&
          ranges?.rangeList?.map((range, index) => (
            <RangeCard
              dataUiTestId={`${dataUiTestId}_range-card-${index}`}
              title={range.rangeName || ''}
              fromPrice={range.minPrice || undefined}
              key={range.rangeId || index}
              isPersonalPrice={isPersonal ?? false}
              id={range.rangeId || ''}
              rangesUrls={rangesUrls}
              vehicleType={
                isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV
              }
            />
          ))}
        {isAllManufacturersPage &&
          !!manufacturers?.manufacturerList?.length &&
          manufacturers?.manufacturerList?.map((manufacturerData, index) => (
            <RangeCard
              dataUiTestId={`${dataUiTestId}_range-card-${index}`}
              title={manufacturerData.manufacturerName || ''}
              fromPrice={manufacturerData.minPrice || undefined}
              manufacturersUrls={manufacturersUrls}
              key={manufacturerData.manufacturerId || index}
              isPersonalPrice={isPersonal ?? false}
              id={manufacturerData?.capId?.toString() || ''}
              vehicleType={
                isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV
              }
              isAllManufacturersCard
            />
          ))}
      </>
    ) : (
      !!cardsData.length &&
        vehiclesList?.map((vehicle: IVehicles, index: number) => (
          <VehicleCard
            dataUiTestId={`${dataUiTestId}_product-card-${index}`}
            bodyStyle={router.query?.bodyStyles === 'Pickup' ? 'Pickup' : null}
            key={vehicle?.node?.derivativeId + vehicle?.cursor || ''}
            data={getCardData(vehicle.node?.derivativeId || '') as IProductCard}
            derivativeId={vehicle.node?.derivativeId}
            url={
              getUrlForVehicleCard(
                vehicle,
                (isCarSearch
                  ? vehicles?.car?.manufacturers
                  : vehicles?.lcv?.manufacturers) || [],
              ) || ''
            }
            title={{
              title: `${vehicle.node?.manufacturerName} ${vehicle.node?.modelName}`,
              description: vehicle.node?.derivativeName || '',
            }}
            isPersonalPrice={isPersonal ?? false}
            isModelPage={isModelPage}
            customCTAColor={customCTAColor}
            index={index}
          />
        ))
    );
  },
);

export default ResultsContainer;
