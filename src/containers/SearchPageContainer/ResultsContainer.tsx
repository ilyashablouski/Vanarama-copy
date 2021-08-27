import React, { memo } from 'react';
import { useRouter } from 'next/router';
import RangeCard from './RangeCard';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import { vehicleList_vehicleList_edges as IVehicles } from '../../../generated/vehicleList';
import { GetProductCard_productCard as IProductCard } from '../../../generated/GetProductCard';
import VehicleCard from '../../components/VehicleCard';
import { rangeList } from '../../../generated/rangeList';
import { genericPagesQuery_genericPages_items as ILegacyUrls } from '../../../generated/genericPagesQuery';
import { manufacturerList } from '../../../generated/manufacturerList';

const getUrlForVehicleCard = (vehicle: IVehicles) =>
  vehicle.node?.manufacturerName === 'Abarth'
    ? vehicle.node?.url
    : vehicle.node?.legacyUrl || vehicle.node?.url; // return slug if legacy url is not exists

interface IProps {
  isManufacturerPage?: boolean;
  isAllManufacturersPage?: boolean;
  ranges: rangeList;
  isPersonal?: boolean;
  rangesUrls?: ILegacyUrls[];
  isCarSearch?: boolean;
  manufacturers: manufacturerList;
  manufacturersUrls?: ILegacyUrls[];
  cardsData: (IProductCard | null)[];
  vehiclesList: any;
  isModelPage?: boolean;
  customCTAColor?: string;
}

const ResultsContainer = memo((props: IProps) => {
  const {
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
  } = props;
  const router = useRouter();

  const getCardData = (capId: string, dataForCards = cardsData) =>
    dataForCards?.filter(card => card?.capId === capId)[0];

  return isManufacturerPage || isAllManufacturersPage ? (
    <>
      {isManufacturerPage &&
        !!ranges?.rangeList?.length &&
        ranges?.rangeList?.map((range, index) => (
          <RangeCard
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
          bodyStyle={router.query?.bodyStyles === 'Pickup' ? 'Pickup' : null}
          key={vehicle?.node?.derivativeId + vehicle?.cursor || ''}
          data={getCardData(vehicle.node?.derivativeId || '') as IProductCard}
          derivativeId={vehicle.node?.derivativeId}
          url={getUrlForVehicleCard(vehicle) || ''}
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
});

export default ResultsContainer;
