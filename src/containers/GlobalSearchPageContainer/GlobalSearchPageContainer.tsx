import React, { memo, useContext, useEffect, useMemo, useState } from 'react';
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
import {
  buildFiltersRequestObject,
  DEFAULT_SORT,
  isSimilarPage,
  productCardDataMapper,
} from './helpers';
import {
  useGSCardsData,
  useTextSearchList,
  IGSVehiclesCardsData,
} from '../GlobalSearchContainer/gql';
import Breadcrumbs from '../../core/atoms/breadcrumbs-v2';
import CommonDescriptionContainer from '../SearchPageContainer/CommonDescriptionContainer';
import { GlobalSearchCardsData_productCard as ICardsData } from '../../../generated/GlobalSearchCardsData';
import {
  ProductDerivativeSort,
  VehicleTypeEnum,
} from '../../../generated/globalTypes';
import Skeleton from '../../components/Skeleton';
import useFirstRenderEffect from '../../hooks/useFirstRenderEffect';
import VehicleCard from '../../components/VehicleCard';
import FiltersTags from './FiltersTags';
import Drawer from '../../core/molecules/drawer/Drawer';
import { IFiltersData, IProps, ISelectedTags, ITabs } from './interfaces';
import { pluralise } from '../../utils/dates';
import GlobalSearchPageFilters from '../../components/GlobalSearchPageFilters';
import { RESULTS_PER_REQUEST } from '../SearchPageContainer/helpers';
import DrawerActions from './DrawerActions';
import GlobalSearchPageSort from '../../components/GlobalSearchPageSort';
import {
  generateSortArray,
  sortValues,
} from '../../components/GlobalSearchPageSort/helpers';
import { filtersConfig as config } from '../../components/GlobalSearchPageFilters/config';
import { generateQueryObject } from '../../components/GlobalSearchPageFilters/helpers';
import {
  isManufacturerMigrated,
  ManufacturersSlugContext,
} from '../../utils/url';

const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

const GlobalSearchPageContainer = memo(
  ({
    preLoadProductDerivatives,
    metaData,
    pageData,
    carsData,
    vansData,
    filtersData,
    initialFilters,
    defaultSort,
    isAllProductsRequest,
  }: IProps) => {
    const router = useRouter();

    const { vehicles: migratedManufacturers } = useContext(
      ManufacturersSlugContext,
    );

    const searchTerm = useMemo(
      () => decodeURIComponent(router?.query.searchTerm as string),
      [router?.query.searchTerm],
    );
    const [activeFilters, setActiveFilters] = useState<IFiltersData>(
      initialFilters,
    );
    const [selectedTags, setSelectedTags] = useState<ISelectedTags[]>([]);
    const [isShowDrawer, setIsShowDrawer] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<ITabs>(ITabs.Filter);
    const [isPersonal, setIsPersonal] = useState(true);
    const [isSpecialOffer, setIsSpecialOffer] = useState(false);

    const [vehiclesList, setVehicleList] = useState<(IVehiclesList | null)[]>(
      preLoadProductDerivatives?.derivatives || [],
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

    const [totalResults, setTotalResults] = useState(
      preLoadProductDerivatives?.total || 0,
    );

    const [sortOrder, setSortOrder] = useState(defaultSort);

    const [getCarCardsData] = useGSCardsData(async data => {
      setCarCardsData(prevState => [
        ...prevState,
        ...(data.productCard as ICardsData[]),
      ]);
    });

    const [getLcvCardsData] = useGSCardsData(async data => {
      setLcvCardsData(prevState => [
        ...prevState,
        ...(data.productCard as ICardsData[]),
      ]);
    });

    // using for prevent canceled request
    const [getCarCardsDataCache] = useGSCardsData(async data => {
      setCarCardsData(prevState => [
        ...prevState,
        ...(data.productCard as ICardsData[]),
      ]);
    });

    const [getLcvCardsDataCache] = useGSCardsData(async data => {
      setLcvCardsData(prevState => [
        ...prevState,
        ...(data.productCard as ICardsData[]),
      ]);
    });

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

    const [
      getVehicles,
      { data: firstResultsData, loading },
    ] = useTextSearchList(
      isAllProductsRequest ? undefined : searchTerm,
      async vehicles => {
        if (vehicles.productDerivatives?.total === 0 && isSpecialOffer) {
          setIsSpecialOffer(false);
          return getVehicles();
        }
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
      0,
      isPersonal,
      isSpecialOffer,
      buildFiltersRequestObject(activeFilters),
      sortOrder as ProductDerivativeSort[],
    );

    const [getVehiclesCache] = useTextSearchList(
      isAllProductsRequest ? undefined : searchTerm,
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

    // reset filters after update search term
    useFirstRenderEffect(() => {
      setActiveFilters(initialFilters);
    }, [initialFilters]);

    useEffect(() => {
      if (
        firstResultsData?.productDerivatives?.derivatives?.length ===
          RESULTS_PER_REQUEST &&
        !loading
      ) {
        getVehiclesCache({
          variables: {
            query: isAllProductsRequest ? undefined : searchTerm,
            from: RESULTS_PER_REQUEST,
            filters: buildFiltersRequestObject(
              activeFilters,
              isSpecialOffer,
              isPersonal,
            ),
            sort: sortOrder as ProductDerivativeSort[],
          },
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firstResultsData, loading]);

    useEffect(() => {
      if (
        preLoadProductDerivatives?.derivatives?.length === RESULTS_PER_REQUEST
      ) {
        getVehiclesCache({
          variables: {
            query: isAllProductsRequest ? undefined : searchTerm,
            from: RESULTS_PER_REQUEST,
            filters: buildFiltersRequestObject(
              activeFilters,
              isSpecialOffer,
              isPersonal,
            ),
            sort: sortOrder as ProductDerivativeSort[],
          },
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getVehiclesCache, preLoadProductDerivatives]);

    const onSearch = () => {
      getVehicles();
      const query = {
        searchTerm,
        ...generateQueryObject(activeFilters),
      };
      const queryString = new URLSearchParams();
      Object.entries(query).forEach(filter => {
        const [key, value] = filter as [string, string | string[]];
        queryString.set(key, encodeURIComponent(value as string));
      });
      // changing url dynamically
      router.replace(
        {
          pathname: router.route,
          query,
        },
        `/search?${queryString.toString()}`,
        { shallow: true },
      );
    };

    useFirstRenderEffect(() => {
      onSearch();
    }, [activeFilters, sortOrder, isPersonal]);

    useFirstRenderEffect(() => {
      setSortOrder(DEFAULT_SORT);
    }, [isSpecialOffer]);

    useFirstRenderEffect(() => {
      if (preLoadProductDerivatives?.derivatives) {
        setVehicleList(preLoadProductDerivatives?.derivatives);
        setCarCardsData(carsData || []);
        setLcvCardsData(vansData || []);
      }
    }, [preLoadProductDerivatives]);

    const onLoadMore = () => {
      setVehicleList(prevState => [...prevState, ...vehiclesListCache]);
      getVehiclesCache({
        variables: {
          filters: buildFiltersRequestObject(
            activeFilters,
            isSpecialOffer,
            isPersonal,
          ),
          query: isAllProductsRequest ? undefined : searchTerm,
          // because state haven't updated yet
          from: vehiclesList.length + RESULTS_PER_REQUEST,
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

    const getProductCardData = (
      capId: string,
      vehicleType: VehicleTypeEnum,
    ) => {
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
      if (key === 'manufacturerNames') {
        const indexOfManufacturer = activeFilters.manufacturerNames?.findIndex(
          filterValue => value === (filterValue as string),
        );
        // remove range and make values
        setActiveFilters({
          ...activeFilters,
          manufacturerNames: activeFilters.manufacturerNames?.filter(
            activeValue => activeValue !== value,
          ) as string[],
          rangeName: activeFilters.rangeName?.[0]
            ? (activeFilters?.rangeName?.filter(
                (activeValue, index) => index !== indexOfManufacturer,
              ) as string[])
            : [],
        });
        return;
      }
      if (key === 'rangeName') {
        const indexOfManufacturer = activeFilters.rangeName?.findIndex(
          filterValue => value === (filterValue as string),
        );
        // if we remove range tag, we will replace it to empty string for prevent incorrect summary rendering
        setActiveFilters({
          ...activeFilters,
          rangeName: activeFilters.rangeName?.[0]
            ? (activeFilters?.rangeName?.map((activeValue, index) =>
                index === indexOfManufacturer ? '' : activeValue,
              ) as string[])
            : [],
        });
        return;
      }
      setActiveFilters({
        ...activeFilters,
        [key]: (activeFilters?.[key as keyof IFiltersData] as (
          | string
          | number
        )[])?.filter(activeValue => activeValue !== value),
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
    };

    return (
      <>
        <div className="row:title">
          <Breadcrumbs items={breadcrumbsItems} />
          <CommonDescriptionContainer pageData={pageData} />
          {isAllProductsRequest ? (
            <Text tag="p" color="black" size="lead" className="heading">
              0 results for your search ‘{searchTerm}‘. Please try another
              search
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
              {searchTerm}.
            </Text>
          )}
        </div>
        <div className="srp-f-bar">
          <button
            type="button"
            className="filters"
            onClick={() => tabsHandler(ITabs.Filter)}
            data-uitestid="global-search-page-container_button_filters"
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
            data-uitestid="global-search-page-container_button_sort"
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
                  url={
                    (isManufacturerMigrated(
                      (vehicle?.vehicleType === VehicleTypeEnum.CAR
                        ? migratedManufacturers?.car?.manufacturers
                        : migratedManufacturers?.lcv?.manufacturers) || [],
                      vehicle?.manufacturerName || '',
                    )
                      ? vehicle?.url
                      : vehicle?.lqUrl || vehicle?.url) || ''
                  }
                  title={{
                    title: `${vehicle?.manufacturerName} ${vehicle?.modelName}`,
                    description: vehicle?.derivativeName || '',
                  }}
                  isPersonalPrice={isPersonal}
                  dataUiTestId="global-search-page-container"
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
              dataUiTestId="global-search-page-container_button_load-more"
            />
          </div>
        )}
        <Drawer
          isShowDrawer={isShowDrawer}
          isLoading={loading}
          onCloseDrawer={() => {
            setIsShowDrawer(false);
            setActiveTab(ITabs.Filter);
          }}
          title={activeTab === ITabs.Filter ? 'Filter' : 'Sort'}
          renderContent={
            <div
              className={cx('content', {
                filters: activeTab === ITabs.Filter,
                sort: activeTab !== ITabs.Filter,
              })}
              data-uitestid={`global-search-page-container_div_${
                activeTab === ITabs.Filter ? 'filter' : 'sort'
              }`}
            >
              {activeTab === ITabs.Filter ? (
                <GlobalSearchPageFilters
                  config={config}
                  isAllProductsRequest={isAllProductsRequest}
                  preloadFilters={filtersData}
                  activeFilters={activeFilters}
                  setActiveFilters={setActiveFilters}
                  setSelectedTags={setSelectedTags}
                  selectedTags={selectedTags}
                  clearFilterBlock={onClearFilterBlock}
                  isPersonal={isPersonal}
                  setIsPersonal={setIsPersonal}
                  isSpecialOffer={isSpecialOffer}
                  setIsSpecialOffer={setIsSpecialOffer}
                  onRemoveTag={onRemoveTag}
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
                dataUiTestId="global-search-page-container"
              />
            ) : (
              <></>
            )
          }
          dataUiTestId="global-search-page-container"
        />
      </>
    );
  },
  isSimilarPage,
);

GlobalSearchPageContainer.displayName = 'GlobalSearchPageContainer';

export default GlobalSearchPageContainer;
