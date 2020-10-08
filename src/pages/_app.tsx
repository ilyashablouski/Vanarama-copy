import { useLazyQuery } from '@apollo/client';
import { ToastContainer } from '@vanarama/uibook/lib/components/atoms/toast/Toast';
import '@vanarama/uibook/src/components/base.scss';
import { AppProps } from 'next/app';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import ComparatorBar from '@vanarama/uibook/lib/components/organisms/comparator-bar';
import Modal from '@vanarama/uibook/lib/components/molecules/modal';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import { isNotShowBreadcrumbs, SEARCH_PAGES } from '../utils/url';
import {
  PAGES_WITH_COMPARATOR,
  CompareContext,
  WHOLE_PATHS_PAGES_WITH_COMPARATOR,
  PAGES_WITHOUT_COMPARATOR,
} from '../utils/comparatorTool';
import HeaderContainer from '../containers/HeaderContainer';
import {
  getCompares,
  deleteCompare,
  getVehiclesForComparator,
  IVehicle,
  IVehicleCarousel,
  isCorrectCompareType,
  changeCompares,
} from '../utils/comparatorHelpers';
import FooterContainer from '../containers/FooterContainer';
import { GENERIC_PAGE_HEAD } from '../gql/genericPage';
import { getSectionsData } from '../utils/getSectionsData';
import Head from '../components/Head/Head';
import withApollo from '../hocs/withApollo';
import {
  GenericPageHeadQuery,
  GenericPageHeadQueryVariables,
} from '../../generated/GenericPageHeadQuery';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const [compareVehicles, setCompareVehicles] = useState<
    IVehicle[] | IVehicleCarousel[] | [] | null | undefined
  >([]);
  const [modalCompareTypeError, setModalCompareTypeError] = useState<
    boolean | undefined
  >(false);
  const [existComparator, setExistComparator] = useState(false);
  const [getPageHead, pageHead] = useLazyQuery<
    GenericPageHeadQuery,
    GenericPageHeadQueryVariables
  >(GENERIC_PAGE_HEAD, { variables: { slug: router.asPath.slice(1) } });

  useEffect(() => {
    // Anytime router.push is called, scroll to the top of the page.
    // it should be prevent for cases when we make a url replace in search pages after filters changing
    Router.events.on('routeChangeComplete', (url: string) => {
      const isSearchPage = !!SEARCH_PAGES.find(element =>
        url.includes(element),
      );
      if (!isSearchPage) window.scrollTo(0, 0);
    });
  }, []);

  useEffect(() => {
    const getVehicles = async () => {
      const vehiclesCompares = (await getCompares()) as
        | IVehicle[]
        | IVehicleCarousel[]
        | null;
      if (vehiclesCompares) {
        setCompareVehicles(vehiclesCompares);
      }
    };
    getVehicles();

    if (
      (PAGES_WITH_COMPARATOR.some(page => router.pathname.includes(page)) &&
        !PAGES_WITHOUT_COMPARATOR.some(page =>
          router.pathname.includes(page),
        )) ||
      WHOLE_PATHS_PAGES_WITH_COMPARATOR.some(page => router.pathname === page)
    ) {
      setExistComparator(true);
    } else {
      setExistComparator(false);
    }
  }, [router.pathname]);

  useEffect(() => {
    if (
      !(
        router.pathname.includes('[...details-page]') ||
        router.pathname.includes('/olaf') ||
        router.pathname.includes('/blog') ||
        router.pathname.includes('/non-blog') ||
        router.pathname.length === 1
      )
    ) {
      getPageHead();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const compareChange = async (
    product?: IVehicle | IVehicleCarousel | null | undefined,
    capId?: string | number,
  ) => {
    if (capId || isCorrectCompareType(product || null, compareVehicles)) {
      const compares = (await changeCompares(
        product || null,
        capId || undefined,
      )) as IVehicle[] | IVehicleCarousel[] | null;
      setCompareVehicles(compares);
    } else {
      setModalCompareTypeError(true);
    }
  };

  const resolveMainClass = () => {
    const isTrailingSlug = (slug: string) => {
      const index = router.asPath.lastIndexOf('-');
      const pathSlug = router.asPath.substr(index);
      return `-${slug}` === pathSlug;
    };

    if (
      isTrailingSlug('details') ||
      router.pathname.includes('[...details-page]')
    ) {
      return 'page:pdp';
    }
    if (isTrailingSlug('testimonials')) {
      return 'page:testimonials';
    }
    return 'page:default';
  };

  const metaData = getSectionsData(['metaData'], pageHead?.data?.genericPage);
  const featuredImage = getSectionsData(
    ['featuredImage'],
    pageHead?.data?.genericPage,
  );

  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  return (
    <>
      <ToastContainer />
      <main className={cx(resolveMainClass())}>
        <HeaderContainer />
        {!isNotShowBreadcrumbs(router.pathname) && (
          <div className="row:title">
            <Breadcrumb items={breadcrumbsItems} />
          </div>
        )}
        <CompareContext.Provider
          value={{
            compareVehicles,
            compareChange,
          }}
        >
          <Component {...pageProps} />
        </CompareContext.Provider>
        {compareVehicles && compareVehicles.length > 0 && existComparator && (
          <ComparatorBar
            deleteVehicle={async vehicle => {
              const vehicles = await deleteCompare(vehicle);
              setCompareVehicles(vehicles);
            }}
            compareVehicles={() => {
              Router.push('/comparator');
            }}
            vehicles={getVehiclesForComparator(compareVehicles)}
          />
        )}
        {modalCompareTypeError && (
          <Modal
            title="You cannot compare two different vehicle types."
            show
            onRequestClose={() => setModalCompareTypeError(false)}
          >
            <Button
              className="-mt-200"
              color="teal"
              onClick={() => setModalCompareTypeError(false)}
              label="Okay"
            />
          </Modal>
        )}
        <FooterContainer />
      </main>
      {metaData && <Head metaData={metaData} featuredImage={featuredImage} />}
    </>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default withApollo(MyApp);
