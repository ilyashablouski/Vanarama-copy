import React, { memo } from 'react';
import { useRouter } from 'next/router';
import RangeCard from './RangeCard';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import { vehicleList_vehicleList_edges as IVehicles } from '../../../generated/vehicleList';
import {
  GetProductCard_productCard,
  GetProductCard_productCard as IProductCard,
} from '../../../generated/GetProductCard';
import { getLegacyUrl } from '../../utils/url';
import VehicleCard from './VehicleCard';
import { rangeList } from '../../../generated/rangeList';
import { genericPagesQuery_genericPages_items as ILegacyUrls } from '../../../generated/genericPagesQuery';
import { manufacturerList } from '../../../generated/manufacturerList';
import { GetDerivatives_derivatives } from '../../../generated/GetDerivatives';

interface IProps {
  isMakePage?: boolean;
  isAllMakesPage?: boolean;
  ranges: rangeList;
  isPersonal?: boolean;
  rangesUrls?: ILegacyUrls[];
  isCarSearch?: boolean;
  manufacturers: manufacturerList;
  makesUrls?: ILegacyUrls[];
  cardsData: (IProductCard | null)[];
  carDer: (GetDerivatives_derivatives | null)[];
  vehiclesList: any;
  isModelPage?: boolean;
  getCardData: (
    capId: string,
    dataForCards?: (GetProductCard_productCard | null)[],
  ) => GetProductCard_productCard | null | undefined;
}

const ResultsContainer = memo((props: IProps) => {
  const {
    isMakePage,
    isAllMakesPage,
    ranges,
    isPersonal,
    rangesUrls,
    isCarSearch,
    manufacturers,
    makesUrls,
    cardsData,
    carDer,
    vehiclesList,
    isModelPage,
    getCardData,
  } = props;
  const router = useRouter();
  return isMakePage || isAllMakesPage ? (
    <>
      {isMakePage &&
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
      {isAllMakesPage &&
        !!manufacturers?.manufacturerList?.length &&
        manufacturers?.manufacturerList?.map((makeData, index) => (
          <RangeCard
            title={makeData.manufacturerName || ''}
            fromPrice={makeData.minPrice || undefined}
            makesUrls={makesUrls}
            key={makeData.manufacturerId || index}
            isPersonalPrice={isPersonal ?? false}
            id={makeData?.capId?.toString() || ''}
            vehicleType={
              isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV
            }
            isAllMakesCard
          />
        ))}
    </>
  ) : (
    !!cardsData.length &&
      !!carDer.length &&
      vehiclesList?.map((vehicle: IVehicles) => (
        <VehicleCard
          bodyStyle={router.query?.bodyStyles === 'Pickup' ? 'Pickup' : null}
          key={vehicle?.node?.derivativeId + vehicle?.cursor || ''}
          data={getCardData(vehicle.node?.derivativeId || '') as IProductCard}
          derivativeId={vehicle.node?.derivativeId}
          url={getLegacyUrl(vehiclesList, vehicle.node?.derivativeId)}
          title={{
            title: `${vehicle.node?.manufacturerName} ${vehicle.node?.modelName}`,
            description: vehicle.node?.derivativeName || '',
          }}
          isPersonalPrice={isPersonal ?? false}
          isModelPage={isModelPage}
        />
      ))
  );
});

export default ResultsContainer;