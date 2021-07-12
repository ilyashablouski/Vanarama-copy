import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'core/atoms/button/Button';
import dynamic from 'next/dynamic';
import OptionsSharp from 'core/assets/icons/OptionsSharp';
import SwapVerticalSharp from 'core/assets/icons/SwapVerticalSharp';
import cx from 'classnames';
import {
  productDerivatives as ITextSearchQuery,
  productDerivatives_productDerivatives_derivatives as IVehiclesList,
} from '../../../generated/productDerivatives';
import { buildFiltersRequestObject, productCardDataMapper } from './helpers';
import {
  useGSCardsData,
  useTextSearchList,
} from '../GlobalSearchContainer/gql';
import {
  GenericPageQuery,
  GenericPageQuery_genericPage_metaData as PageMetaData,
} from '../../../generated/GenericPageQuery';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import CommonDescriptionContainer from '../SearchPageContainer/CommonDescriptionContainer';
import { GlobalSearchCardsData_productCard as ICardsData } from '../../../generated/GlobalSearchCardsData';
import {
  ProductDerivativeSort,
  VehicleTypeEnum,
} from '../../../generated/globalTypes';
import Skeleton from '../../components/Skeleton';
import useFirstRenderEffect from '../../hooks/useFirstRenderEffect';
import { getSectionsData } from '../../utils/getSectionsData';
import SectionCards from '../../components/SectionCards';
import VehicleCard from '../../components/VehicleCard';
import FiltersTags from './FiltersTags';
import Drawer from '../../core/molecules/drawer/Drawer';
import { IFiltersData, ISelectedTags, ITabs } from './interfaces';
import { pluralise } from '../../utils/dates';
import GlobalSearchPageFilters from '../../components/GlobalSearchPageFilters';
import { productFilter_productFilter as IProductFilter } from '../../../generated/productFilter';
import { RESULTS_PER_REQUEST } from '../SearchPageContainer/helpers';
import DrawerActions from './DrawerActions';
import GlobalSearchPageSort from '../../components/GlobalSearchPageSort';
import useSortOrder from '../../hooks/useSortOrder';
import {
  generateSortArray,
  sortValues,
} from '../../components/GlobalSearchPageSort/helpers';

const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps {
  pageData?: GenericPageQuery;
  filtersData?: IProductFilter;
  initialFilters: IFiltersData;
  metaData: PageMetaData;
  preLoadProductDerivatives: ITextSearchQuery;
  carsData?: ICardsData[];
  vansData?: ICardsData[];
  responseVansCapIds?: string[];
  responseCarsCapIds?: string[];
  defaultSort?: ProductDerivativeSort[];
}
export interface IGSVehiclesCardsData<T> {
  LCV: T;
  CAR: T;
}

const GlobalSearchPageContainer = ({
  preLoadProductDerivatives,
  metaData,
  pageData,
  carsData,
  vansData,
  responseVansCapIds,
  responseCarsCapIds,
  filtersData,
  initialFilters,
  defaultSort,
}: IProps) => {
  const router = useRouter();
  const [activeFilters, setActiveFilters] = useState<IFiltersData>(
    initialFilters,
  );
  const [selectedTags, setSelectedTags] = useState<ISelectedTags[]>([]);
  const [isShowDrawer, setIsShowDrawer] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<ITabs>(ITabs.Filter);

  const [vehiclesList, setVehicleList] = useState<(IVehiclesList | null)[]>(
    preLoadProductDerivatives.productDerivatives?.derivatives || [],
  );
  const [vehiclesListCache, setVehicleListCache] = useState<
    (IVehiclesList | null)[]
  >([]);

  const [lcvCardsData, setLcvCardsData] = useState<ICardsData[]>(
    vansData || [],
  );
  const [carCardsData, setCarCardsData] = useState<ICardsData[]>(
    carsData || [],
  );

  const vehiclesCardsData: IGSVehiclesCardsData<ICardsData[]> = {
    LCV: lcvCardsData,
    CAR: carCardsData,
  };

  const [capIds] = useState<IGSVehiclesCardsData<string[]>>({
    LCV: responseVansCapIds || [],
    CAR: responseCarsCapIds || [],
  });

  const [totalResults, setTotalResults] = useState(
    preLoadProductDerivatives?.productDerivatives?.total || 0,
  );

  const { savedSortOrder, saveSortOrder } = useSortOrder(defaultSort);
  const [sortOrder, setSortOrder] = useState(savedSortOrder);

  const [getCarCardsData] = useGSCardsData(
    capIds.CAR,
    VehicleTypeEnum.CAR,
    async data => {
      setCarCardsData(prevState => [
        ...prevState,
        ...(data.productCard as ICardsData[]),
      ]);
    },
  );

  const [getLcvCardsData] = useGSCardsData(
    capIds.LCV,
    VehicleTypeEnum.LCV,
    async data => {
      setLcvCardsData(prevState => [
        ...prevState,
        ...(data.productCard as ICardsData[]),
      ]);
    },
  );

  // using for prevent canceled request
  const [getCarCardsDataCache] = useGSCardsData(
    capIds.CAR,
    VehicleTypeEnum.CAR,
    async data => {
      setCarCardsData(prevState => [
        ...prevState,
        ...(data.productCard as ICardsData[]),
      ]);
    },
  );

  const [getLcvCardsDataCache] = useGSCardsData(
    capIds.LCV,
    VehicleTypeEnum.LCV,
    async data => {
      setLcvCardsData(prevState => [
        ...prevState,
        ...(data.productCard as ICardsData[]),
      ]);
    },
  );

  const productDerivativesCallback = (vehicles: ITextSearchQuery) => {
    const carsCapIds = vehicles?.productDerivatives?.derivatives
      ?.filter(
        vehicle => (vehicle?.vehicleType as string) === VehicleTypeEnum.CAR,
      )
      .map(vehicle => `${vehicle?.derivativeId}`)
      .filter(value => value) as string[];
    const vansCapIds = vehicles?.productDerivatives?.derivatives
      ?.filter(
        vehicle => (vehicle?.vehicleType as string) === VehicleTypeEnum.LCV,
      )
      .map(vehicle => `${vehicle?.derivativeId}`)
      .filter(value => value) as string[];
    return [carsCapIds, vansCapIds];
  };

  const [getVehicles, { data: firstResultsData, loading }] = useTextSearchList(
    router.query.searchTerm as string,
    0,
    async vehicles => {
      setCarCardsData([]);
      setLcvCardsData([]);
      const [carsCapIds, vansCapIds] = productDerivativesCallback(vehicles);
      if (carsCapIds[0]) {
        getCarCardsData({
          variables: {
            capIds: carsCapIds,
            vehicleType: VehicleTypeEnum.CAR,
          },
        });
      }
      if (vansCapIds[0]) {
        getLcvCardsData({
          variables: {
            capIds: vansCapIds,
            vehicleType: VehicleTypeEnum.LCV,
          },
        });
      }
      setTotalResults(vehicles.productDerivatives?.total || 0);
      return setVehicleList(vehicles?.productDerivatives?.derivatives || []);
    },
    buildFiltersRequestObject(activeFilters),
    sortOrder as ProductDerivativeSort[],
  );

  const [getVehiclesCache] = useTextSearchList(
    router.query.searchTerm as string,
    vehiclesList.length + 1,
    async vehicles => {
      const [carsCapIds, vansCapIds] = productDerivativesCallback(vehicles);
      if (carsCapIds[0]) {
        getCarCardsDataCache({
          variables: {
            capIds: carsCapIds,
            vehicleType: VehicleTypeEnum.CAR,
          },
        });
      }
      if (vansCapIds[0]) {
        getLcvCardsDataCache({
          variables: {
            capIds: vansCapIds,
            vehicleType: VehicleTypeEnum.LCV,
          },
        });
      }
      return setVehicleListCache(
        vehicles?.productDerivatives?.derivatives || [],
      );
    },
  );

  useEffect(() => {
    if (
      firstResultsData?.productDerivatives?.derivatives?.length ===
        RESULTS_PER_REQUEST &&
      !loading
    ) {
      getVehiclesCache({
        variables: {
          query: router.query.searchTerm as string,
          from: RESULTS_PER_REQUEST + 1,
          filters: buildFiltersRequestObject(activeFilters),
          sort: sortOrder as ProductDerivativeSort[],
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstResultsData, loading]);

  useEffect(() => {
    if (
      preLoadProductDerivatives.productDerivatives?.derivatives?.length ===
      RESULTS_PER_REQUEST
    ) {
      getVehiclesCache({
        variables: {
          query: router.query.searchTerm as string,
          from: RESULTS_PER_REQUEST + 1,
          filters: buildFiltersRequestObject(activeFilters),
          sort: sortOrder as ProductDerivativeSort[],
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getVehiclesCache, preLoadProductDerivatives]);

  useFirstRenderEffect(() => {
    getVehicles();
  }, [activeFilters, sortOrder]);

  useFirstRenderEffect(() => {
    if (preLoadProductDerivatives.productDerivatives?.derivatives) {
      setVehicleList(preLoadProductDerivatives.productDerivatives?.derivatives);
      setCarCardsData(carsData || []);
      setLcvCardsData(vansData || []);
    }
  }, [preLoadProductDerivatives]);

  const onLoadMore = () => {
    setVehicleList(prevState => [...prevState, ...vehiclesListCache]);
    getVehiclesCache({
      variables: {
        filters: buildFiltersRequestObject(activeFilters),
        query: router.query.searchTerm as string,
        from: vehiclesList.length + 1,
        sort: sortOrder as ProductDerivativeSort[],
      },
    });
  };

  const breadcrumbsItems = useMemo(
    () =>
      metaData?.breadcrumbs?.map((el: any) => ({
        link: { href: el.href || '', label: el.label },
      })),
    [metaData],
  );

  const shouldLoadMore = useMemo(() => totalResults > vehiclesList.length, [
    totalResults,
    vehiclesList.length,
  ]);

  const cards = useMemo(
    () =>
      getSectionsData(['sections', 'cards', 'cards'], pageData?.genericPage),
    [pageData],
  );

  const totalFiltersCount = useMemo(
    () =>
      Object.values(activeFilters).reduce((acc, current) => {
        if (current?.[0]) {
          return acc + current.length;
        }
        return acc;
      }, 0),
    [activeFilters],
  );

  const getProductCardData = (capId: string, vehicleType: VehicleTypeEnum) => {
    return vehiclesCardsData?.[vehicleType].find(x => x?.capId === capId);
  };

  const tabsHandler = (tab: ITabs) => {
    if (isShowDrawer) {
      setIsShowDrawer(false);
    } else {
      setActiveTab(tab);
      setIsShowDrawer(true);
    }
  };

  const onRemoveTag = (value: string, key: string) => {
    setActiveFilters({
      ...activeFilters,
      [key]: activeFilters?.[key as keyof IFiltersData]?.filter(
        activeValue => activeValue !== value,
      ),
    });
  };

  const onClearFilterBlock = (key: string) => {
    setActiveFilters({
      ...activeFilters,
      [key]: [],
    });
  };

  // handler for changing sort order
  const onChangeSortOrder = (value: string) => {
    setSortOrder(generateSortArray(value));
    saveSortOrder(generateSortArray(value));
  };

  return (
    <>
      <div className="row:title">
        <Breadcrumb items={breadcrumbsItems} />
        <CommonDescriptionContainer pageData={pageData} />
        {totalResults === 0 ? (
          <Text tag="p" color="black" size="lead" className="heading">
            0 results for your search “{router.query.searchTerm as string}”
            Search again, try our vehicle categories.
          </Text>
        ) : (
          <Text
            tag="span"
            color="dark"
            size="large"
            className="-mb-500 heading"
          >
            {totalResults}{' '}
            {pluralise(totalResults, { one: 'result', many: 'results' })} for{' '}
            {router.query.searchTerm as string}.
          </Text>
        )}
      </div>
      <div className="srp-f-bar">
        <button
          type="button"
          className="filters"
          onClick={() => tabsHandler(ITabs.Filter)}
        >
          <OptionsSharp />
          Filter
          {totalFiltersCount > 0 && (
            <span className="filters-applied">{totalFiltersCount}</span>
          )}
        </button>

        <button
          className="sort -darker"
          type="button"
          onClick={() => tabsHandler(ITabs.Sort)}
        >
          <SwapVerticalSharp />
          Sort
        </button>
      </div>
      <div className="row:bg-light">
        <FiltersTags
          tags={selectedTags}
          removeFilterValue={onRemoveTag}
          clearAllFilters={() => setActiveFilters({} as IFiltersData)}
        />
        <div className="row:results">
          <div className="row:cards-3col">
            {vehiclesList?.map(vehicle => (
              <VehicleCard
                key={
                  (vehicle?.derivativeId || `${vehicle?.capBodyStyle}`) +
                  (vehicle?.vehicleType || '')
                }
                data={{
                  ...productCardDataMapper(vehicle),
                  ...getProductCardData(
                    vehicle?.derivativeId?.toString() || '',
                    (vehicle?.vehicleType as VehicleTypeEnum) ||
                      VehicleTypeEnum.LCV,
                  ),
                }}
                derivativeId={vehicle?.derivativeId?.toString()}
                url={vehicle?.lqUrl || vehicle?.url || ''}
                title={{
                  title: `${vehicle?.manufacturerName} ${vehicle?.modelName}`,
                  description: vehicle?.derivativeName || '',
                }}
                isPersonalPrice
              />
            ))}
          </div>
        </div>
      </div>
      {shouldLoadMore && (
        <div className="pagination">
          <Button
            color="teal"
            fill="outline"
            label="Load More"
            onClick={onLoadMore}
            size="regular"
            dataTestId="LoadMore"
          />
        </div>
      )}
      {totalResults === 0 && (
        <div className="row:bg-light -col-300">
          <div className="row:cards-3col">
            {cards && <SectionCards cards={cards} />}
          </div>
        </div>
      )}
      <Drawer
        isShowDrawer={isShowDrawer}
        isLoading={loading}
        onCloseDrawer={() => setIsShowDrawer(false)}
        title={activeTab === ITabs.Filter ? 'Filter' : 'Sort'}
        renderContent={
          <div
            className={cx('content', {
              filters: activeTab === ITabs.Filter,
              sort: activeTab !== ITabs.Filter,
            })}
          >
            {activeTab === ITabs.Filter ? (
              <GlobalSearchPageFilters
                onRemoveTag={onRemoveTag}
                preloadFilters={filtersData}
                activeFilters={activeFilters}
                setActiveFilters={setActiveFilters}
                setSelectedTags={setSelectedTags}
                selectedTags={selectedTags}
                clearFilterBlock={onClearFilterBlock}
              />
            ) : (
              <GlobalSearchPageSort
                sortingValues={sortValues}
                onSortChange={onChangeSortOrder}
                selectedSort={(sortOrder as ProductDerivativeSort[])[0]}
              />
            )}
          </div>
        }
        renderActions={
          activeTab === ITabs.Filter ? (
            <DrawerActions
              totalResults={totalResults}
              onResetFilters={() => setActiveFilters({} as IFiltersData)}
              onCloseDrawer={() => setIsShowDrawer(false)}
            />
          ) : (
            <></>
          )
        }
      />
    </>
  );
};

export default GlobalSearchPageContainer;
