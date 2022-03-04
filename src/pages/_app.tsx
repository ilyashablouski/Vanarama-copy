/* eslint-disable @typescript-eslint/no-unused-vars */
// import 'core/styles/base.scss';
import 'utils/wdyr';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { useApolloClient } from '@apollo/client';
import {
  ManufacturersSlugContext,
  manufacturersSlugInitialState,
  PAGES_WITHOUT_LEASE_RESET,
  removeUrlQueryPart,
  SEARCH_PAGES,
  shouldManufacturersStateUpdate,
} from '../utils/url';
import { CompareContext } from '../utils/comparatorTool';
import {
  changeCompares,
  deleteCompare,
  isCorrectCompareType,
  IVehicle,
  IVehicleCarousel,
} from '../utils/comparatorHelpers';
import { withApolloProvider } from '../hocs/withApollo';
import {
  checkForGtmDomEvent,
  pushPageData,
  pushPageViewEvent,
} from '../utils/dataLayerHelpers';

import Skeleton from '../components/Skeleton';
import HeaderContainer from '../containers/HeaderContainer';
import FooterContainer from '../containers/FooterContainer';
import CookieBarContainer from '../containers/CookieBarContainer';
import { PAGES_WITHOUT_DEFERRED_STYLES } from '../components/Head/defaults';
import { removeSessionStorageItem } from '../utils/windowSessionStorage';
import {
  initializeWishlistState,
  resetWishlistState,
} from '../utils/wishlistHelpers';
import {
  initializePersonState,
  resetPersonState,
} from '../utils/personHelpers';
import { ICustomAppProps, PageTypeEnum } from '../types/common';
import ErrorPage from './_error';
import useFirstRenderEffect from '../hooks/useFirstRenderEffect';
import { serviceBannerInitialData } from '../utils/serviceBannerHelper';

// Dynamic component loading.
const ToastContainer = dynamic(
  // @ts-ignore
  () => import('core/atoms/toast/Toast').then(mod => mod.ToastContainer),
  {
    ssr: false,
  },
);
const CookieBar = dynamic(() => import('core/organisms/cookie-bar'));
const ComparatorBar = dynamic(() => import('core/organisms/comparator-bar'), {
  ssr: false,
});
const Modal = dynamic(() => import('core/molecules/modal'), {
  ssr: false,
});
const Button = dynamic(() => import('core/atoms/button'), {
  loading: () => <Skeleton count={1} />,
});

const Deferred = dynamic(() => import('../components/Style/Deferred'), {
  ssr: false,
});

const MyApp: React.FC<ICustomAppProps> = ({ Component, pageProps, router }) => {
  const [compareVehicles, setCompareVehicles] = useState<
    IVehicle[] | IVehicleCarousel[]
  >([]);
  const [modalCompareTypeError, setModalCompareTypeError] = useState<
    boolean | undefined
  >(false);

  const [migrationSlugs, setMigrationSlugs] = useState(
    pageProps.pageType !== PageTypeEnum.ERROR
      ? pageProps?.migrationSlugs || manufacturersSlugInitialState
      : manufacturersSlugInitialState,
  );

  const [serviceBanner] = useState(
    pageProps.pageType !== PageTypeEnum.ERROR
      ? pageProps?.serviceBanner
      : serviceBannerInitialData.serviceBanner,
  );

  const client = useApolloClient();

  useEffect(() => {
    const initializeGlobalVars = async () => {
      await initializePersonState();
      await initializeWishlistState(client);
    };

    initializeGlobalVars();

    /* Since reactive vars are not automatically reset
     * when we are calling client.resetStore(), we need to do it manually.
     * */
    return client.onResetStore(async () => {
      resetPersonState();
      resetWishlistState();
    });
  }, [client]);

  useEffect(() => {
    // Anytime router.push is called, scroll to the top of the page.
    // it should be prevent for cases when we make a url replace in search pages after filters changing
    Router.events.on('routeChangeComplete', (url: string) => {
      const isSearchPage = !!SEARCH_PAGES.find(element =>
        url.includes(element),
      );
      if (!isSearchPage) {
        window.scrollTo(0, 0);
      }
    });
  }, []);

  // update state only if migrationSlugs is exist
  useFirstRenderEffect(() => {
    if (
      pageProps?.pageType !== PageTypeEnum.ERROR &&
      pageProps?.migrationSlugs?.vehicles &&
      shouldManufacturersStateUpdate(pageProps.migrationSlugs, migrationSlugs)
    ) {
      setMigrationSlugs(pageProps.migrationSlugs);
    }
  }, [pageProps]);

  useEffect(() => {
    async function pushAnalytics() {
      await pushPageData({ pathname: router.pathname });
      await pushPageViewEvent(
        removeUrlQueryPart(router.asPath),
        document.title,
      );
    }
    const shouldRemoveLeasingData = !PAGES_WITHOUT_LEASE_RESET.find(element =>
      router.pathname.includes(element),
    );
    // condition using for prevent incorrect events order on PDP
    if (
      router.pathname !== '/car-leasing/[...details-page]' &&
      router.pathname !== '/van-leasing/[...details-page]'
    ) {
      checkForGtmDomEvent(pushAnalytics);
    }
    // condition using for removing saved lease scanner data after user has left of PDP flow
    if (shouldRemoveLeasingData && window) {
      Object.keys(window.sessionStorage).forEach(element => {
        if (element.includes('leaseSettings')) {
          removeSessionStorageItem(element);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  const compareChange = async (
    product?: IVehicle | IVehicleCarousel | null | undefined,
    capId?: string | number,
  ) => {
    if (capId || isCorrectCompareType(product || null, compareVehicles)) {
      const compares = (await changeCompares(
        product || null,
        capId || undefined,
      )) as IVehicle[] | IVehicleCarousel[] | null;
      setCompareVehicles(compares || []);
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

    if (router.pathname.includes('[...details-page]')) {
      return 'page:pdp';
    }
    if (isTrailingSlug('testimonials')) {
      return 'page:testimonials';
    }
    if (router.pathname.includes('/search')) {
      return 'page:default srp';
    }
    if (router.pathname.includes('/olaf')) {
      return 'page:default -olaf';
    }
    return 'page:default';
  };

  return (
    <>
      <main className={cx(resolveMainClass())}>
        <HeaderContainer serviceBanner={serviceBanner} />
        <CompareContext.Provider
          value={{
            compareVehicles,
            compareChange,
          }}
        >
          {pageProps.pageType === PageTypeEnum.ERROR ? (
            <ErrorPage errorData={pageProps.error} />
          ) : (
            <ManufacturersSlugContext.Provider value={migrationSlugs}>
              <Component {...pageProps} />
            </ManufacturersSlugContext.Provider>
          )}
        </CompareContext.Provider>

        <ComparatorBar
          deleteVehicle={async vehicle => {
            const vehicles = await deleteCompare(vehicle);
            setCompareVehicles(vehicles);
          }}
          compareVehicles={() => {
            Router.push('/comparator');
          }}
          vehicles={compareVehicles}
          setCompareVehicles={setCompareVehicles}
          dataUiTestId="comparator-bar"
        />

        {modalCompareTypeError && (
          <Modal
            title="You cannot compare two different vehicle types."
            show
            dataUiTestIdHeading="comparator-cant_compare-text"
            onRequestClose={() => setModalCompareTypeError(false)}
          >
            <Button
              className="-mt-200"
              color="teal"
              onClick={() => setModalCompareTypeError(false)}
              label="Okay"
              dataUiTestId="comparator-cant_compare-button"
            />
          </Modal>
        )}
        <FooterContainer />
      </main>
      <CookieBarContainer />
      <ToastContainer />

      {!PAGES_WITHOUT_DEFERRED_STYLES.includes(router.pathname) && <Deferred />}
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

export default withApolloProvider(MyApp);
