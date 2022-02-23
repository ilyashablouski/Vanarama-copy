import { FC, useEffect, useState, useCallback } from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import SchemaJSON from 'core/atoms/schema-json';
import dynamic from 'next/dynamic';
import { ApolloQueryResult, useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import { ISearchPageContainerProps } from './interfaces';
import PartnershipLogoHeader from '../PartnershipLogoHeader';
import SearchPageTitle from './sections/SearchPageTitle';
import TopInfoBlock from './sections/TopInfoBlock';
import SearchPageFilters from '../../components/SearchPageFilters';
import ResultsContainer from './sections/ResultsContainer';
import { isServerRenderOrAppleDevice } from '../../utils/deviceType';
import { getPartnerProperties } from '../../utils/partnerProperties';
import TermsAndConditions from './sections/TermsAndConditions';
import Head from '../../components/Head/Head';
import ResultsCount from './components/ResultsCount';
import Skeleton from '../../components/Skeleton';
import {
  buildRewriteRoute,
  createManufacturerListVariables,
  dynamicQueryTypeCheck,
  getPartnershipDescription,
  getPartnershipTitle,
  getValueFromStorage,
  isPreviousPage,
  scrollIntoPreviousView,
  ssrCMSQueryExecutor,
} from './helpers';
import useLeaseType from '../../hooks/useLeaseType';
import { LeaseTypeEnum, VehicleTypeEnum } from '../../../generated/globalTypes';
import { manufacturerList } from '../../../generated/manufacturerList';
import { GenericPageQuery } from '../../../generated/GenericPageQuery';
import { IFilters } from '../FiltersContainer/interfaces';
import { tagArrayBuilderHelper } from '../FiltersContainer/helpers';
import { useManufacturerList } from './gql';
import { removeSessionStorageItem } from '../../utils/windowSessionStorage';
import useFirstRenderEffect from '../../hooks/useFirstRenderEffect';
import { filterList_filterList as IFilterList } from '../../../generated/filterList';

const FiltersContainer = dynamic(() => import('../FiltersContainer'), {
  loading: () => <Skeleton count={2} />,
  ssr: true,
});

const AllManufacturersSearchContainer: FC<ISearchPageContainerProps> = ({
  dataUiTestId,
  isCarSearch = false,
  isServer,
  metaData: metaDataSSR,
  topInfoSection,
  preLoadManufacturers,
  manufacturersUrls,
}) => {
  const { cachedLeaseType, setCachedLeaseType } = useLeaseType(isCarSearch);
  const [isPersonal, setIsPersonal] = useState(
    cachedLeaseType === LeaseTypeEnum.PERSONAL,
  );
  const [isPartnershipActive, setPartnershipActive] = useState(false);
  const [isSpecialOffers, setIsSpecialOffers] = useState(
    getValueFromStorage(isServer, isCarSearch) ?? false,
  );

  const [pageData, setPageData] = useState<GenericPageQuery>();
  const [metaData, setMetaData] = useState(metaDataSSR);

  const [manufacturers, setManufacturers] = useState(
    preLoadManufacturers || ({} as manufacturerList),
  );

  const [prevPosition, setPrevPosition] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [filtersData, setFiltersData] = useState<IFilters>({} as IFilters);

  const [customCTAColor, setCustomCTAColor] = useState<string | undefined>();
  const [pageTitle, setTitle] = useState(metaData?.name || '');
  const [partnershipDescription, setPartnershipDescription] = useState('');

  const client = useApolloClient();
  const router = useRouter();

  // Make list query for all makes page
  const [
    getManufacturerList,
    { data: manufacturersData },
  ] = useManufacturerList(
    isCarSearch ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV,
    isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS,
  );

  // new search with new filters
  const onSearch = useCallback(
    (filtersObject?: IFilters) => {
      const filters = filtersObject || filtersData;
      getManufacturerList(
        createManufacturerListVariables(isCarSearch, isPersonal, filters),
      );
      if (filtersObject) {
        let pathname = router.route
          .replace('[dynamicParam]', router.query?.dynamicParam as string)
          .replace('[rangeName]', router.query?.rangeName as string)
          .replace('[bodyStyles]', router.query?.bodyStyles as string);
        const queryString = new URLSearchParams();
        const query = buildRewriteRoute(filters as IFilters);
        Object.entries(query).forEach(filter => {
          const [key, value] = filter as [string, string | string[]];
          if (value?.length && !(isPartnershipActive && key === 'fuelTypes')) {
            queryString.set(key, value as string);
          }
        });
        if (Object.keys(query).length) {
          pathname += `?${decodeURIComponent(queryString.toString())}`;
        }
        // changing url dynamically
        router.replace(
          {
            pathname: router.route,
            query,
          },
          pathname,
          { shallow: true },
        );
        // set search filters data
        setFiltersData(filters);
      }
    },
    [
      getManufacturerList,
      filtersData,
      isCarSearch,
      isPartnershipActive,
      isPersonal,
      router,
    ],
  );

  const tagArrayBuilder = useCallback(
    (entry: [string, string[]], filtersContainerData: IFilterList) =>
      tagArrayBuilderHelper(entry, filtersContainerData, {
        isPartnershipActive,
      }),
    [isPartnershipActive],
  );

  // listen for any updates to metaDataSSR
  useEffect(() => {
    setMetaData(metaDataSSR);
  }, [metaDataSSR]);

  useFirstRenderEffect(() => {
    onSearch();
  }, [isPersonal]);

  useEffect(() => {
    const partnerActive = getPartnerProperties();
    setPartnershipActive(!!partnerActive);
  }, [isPartnershipActive]);

  useEffect(() => {
    scrollIntoPreviousView(0, prevPosition, setPrevPosition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCachedLeaseType(
      isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS,
    );
  }, [isPersonal, setCachedLeaseType]);

  useEffect(() => {
    const partnerActive = getPartnerProperties();

    if (partnerActive) {
      setCustomCTAColor(partnerActive.color);
      setPartnershipDescription(
        getPartnershipDescription(partnerActive, isCarSearch),
      );
      setTitle(getPartnershipTitle(partnerActive, isCarSearch));
    }
  }, [isCarSearch]);

  // when we change page with one dynamic route by Next router(like from car-leasing/coupe to car-leasing/saloon)
  // Next doesn't call a ssr requests, this workaround should call request for page data on client side
  useEffect(() => {
    if (router.query.isChangePage === 'true') {
      const fetchPageData = async () => {
        const type = Object.entries(
          dynamicQueryTypeCheck(router.query.dynamicParam as string),
        ).find(element => element[1])?.[0];
        const context = {
          req: {
            url: router.route.replace(
              '[dynamicParam]',
              router.query.dynamicParam as string,
            ),
          },
          query: { ...router.query },
        };
        const { data: genericPageData, errors } = (await ssrCMSQueryExecutor(
          client,
          context,
          false,
          type as string,
        )) as ApolloQueryResult<GenericPageQuery>;
        if (!errors?.[0]) {
          setPageData(genericPageData);
          setMetaData(genericPageData.genericPage.metaData);
        }
      };
      fetchPageData();
    }
  }, [router, router.query, client]);

  // using for scroll page to top only for page mount
  useEffect(() => {
    if (window) {
      window.scrollTo(0, 0);
    }
    if (window && !isPreviousPage(router.query)) {
      removeSessionStorageItem('searchPageScrollData');
    }
    // can't add a window to deps, because it isn't exist in SSR
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // initial set makes
  useEffect(() => {
    if (manufacturers?.manufacturerList) {
      setTotalCount(manufacturers?.manufacturerList.length);
    }
  }, [manufacturers, setTotalCount]);

  useEffect(() => {
    if (manufacturersData?.manufacturerList) {
      setManufacturers(manufacturersData);
    }
  }, [manufacturersData, setManufacturers]);

  return (
    <>
      <PartnershipLogoHeader />
      <SearchPageTitle
        dataUiTestId={`${dataUiTestId}_page-title`}
        breadcrumbs={metaData.breadcrumbs}
        pageTitle={pageTitle}
        pageData={pageData}
        partnershipDescription={partnershipDescription}
        isPartnershipActive={isPartnershipActive}
      />
      {topInfoSection && (
        <TopInfoBlock
          topInfoSection={topInfoSection}
          dataUiTestId={`${dataUiTestId}_top-info-block`}
        />
      )}
      <div className="row:bg-light -xthin">
        <div className="row:search-filters">
          <FiltersContainer
            isPersonal={isPersonal}
            setType={value => setIsPersonal(value)}
            tagArrayBuilderHelper={tagArrayBuilder}
            dataUiTestId={dataUiTestId}
            renderFilters={innerProps => (
              <SearchPageFilters
                onSearch={onSearch}
                isCarSearch={isCarSearch}
                isPreloadList={false}
                preSearchVehicleCount={totalCount}
                isAllManufacturersPage
                isPartnershipActive={isPartnershipActive}
                setSearchFilters={setFiltersData}
                dataUiTestId={dataUiTestId}
                isSpecialOffers={isSpecialOffers || null}
                setIsSpecialOffers={setIsSpecialOffers}
                {...innerProps}
              />
            )}
          />
        </div>
      </div>
      <div className="row:bg-lighter -thin">
        <div className="row:results">
          <ResultsCount totalCount={totalCount} dataUiTestId={dataUiTestId} />
          <div className="row:cards-3col">
            <ResultsContainer
              dataUiTestId={`${dataUiTestId}_search-results`}
              isAllManufacturersPage
              isPersonal={isPersonal}
              isCarSearch={isCarSearch}
              manufacturers={manufacturers}
              manufacturersUrls={manufacturersUrls}
              customCTAColor={customCTAColor}
            />
          </div>
        </div>
      </div>
      <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
        <TermsAndConditions dataUiTestId={dataUiTestId} />
      </LazyLoadComponent>
      {metaData && (
        <>
          <Head metaData={metaData} featuredImage={null} />
          <SchemaJSON json={JSON.stringify(metaData.schema)} />
        </>
      )}
    </>
  );
};

export default AllManufacturersSearchContainer;
