/* eslint-disable @typescript-eslint/no-unused-vars */
// import 'core/styles/base.scss';
import dynamic from 'next/dynamic';
import { AppProps } from 'next/app';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import NextHead from 'next/head';
import { removeUrlQueryPart, SEARCH_PAGES } from '../utils/url';
import { CompareContext } from '../utils/comparatorTool';
import {
  deleteCompare,
  getVehiclesForComparator,
  IVehicle,
  IVehicleCarousel,
  isCorrectCompareType,
  changeCompares,
} from '../utils/comparatorHelpers';
import withApollo from '../hocs/withApollo';
import { pushPageData, pushPageViewEvent } from '../utils/dataLayerHelpers';

import Skeleton from '../components/Skeleton';
import HeaderContainer from '../containers/HeaderContainer';
import FooterContainer from '../containers/FooterContainer';
import { PAGES_WITH_DEFERRED_STYLES } from '../components/Head/defaults';

// Dynamic component loading.
const ToastContainer = dynamic(
  // @ts-ignore
  () => import('core/atoms/toast/Toast').then(mod => mod.ToastContainer),
  {
    ssr: false,
  },
);
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

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const [compareVehicles, setCompareVehicles] = useState<
    IVehicle[] | IVehicleCarousel[]
  >([]);
  const [modalCompareTypeError, setModalCompareTypeError] = useState<
    boolean | undefined
  >(false);

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
    async function pushAnalytics() {
      await pushPageData({ pathname: router.pathname });
      await pushPageViewEvent(
        removeUrlQueryPart(router.asPath),
        document.title,
      );
    }
    // condition using for prevent incorrect events order on PDP
    if (
      router.pathname !== '/car-leasing/[...details-page]' &&
      router.pathname !== '/van-leasing/[...details-page]'
    )
      pushAnalytics();
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
    return 'page:default';
  };

  return (
    <>
      <main className={cx(resolveMainClass())}>
        <HeaderContainer />
        <CompareContext.Provider
          value={{
            compareVehicles,
            compareChange,
          }}
        >
          <Component {...pageProps} />
        </CompareContext.Provider>

        <ComparatorBar
          deleteVehicle={async vehicle => {
            const vehicles = await deleteCompare(vehicle);
            setCompareVehicles(vehicles);
          }}
          compareVehicles={() => {
            Router.push('/comparator');
          }}
          vehicles={getVehiclesForComparator(compareVehicles || null)}
          setCompareVehicles={setCompareVehicles}
        />

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
      <LazyLoadComponent>
        <ToastContainer />
      </LazyLoadComponent>

      {!PAGES_WITH_DEFERRED_STYLES.includes(router.pathname) && <Deferred />}
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
