/* eslint-disable @typescript-eslint/no-unused-vars */
import dynamic from 'next/dynamic';
import '@vanarama/uibook/src/components/base.scss';
import { AppProps } from 'next/app';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { SEARCH_PAGES } from '../utils/url';
import {
  PAGES_WITH_COMPARATOR,
  CompareContext,
  WHOLE_PATHS_PAGES_WITH_COMPARATOR,
  PAGES_WITHOUT_COMPARATOR,
} from '../utils/comparatorTool';
import {
  getCompares,
  deleteCompare,
  getVehiclesForComparator,
  IVehicle,
  IVehicleCarousel,
  isCorrectCompareType,
  changeCompares,
} from '../utils/comparatorHelpers';
import withApollo from '../hocs/withApollo';
import { pushPageData } from '../utils/dataLayerHelpers';

import Skeleton from '../components/Skeleton';
import HeaderContainer from '../containers/HeaderContainer';
import FooterContainer from '../containers/FooterContainer';
import { useMobileViewport } from '../hooks/useMediaQuery';

// Dynamic component loading.
const ToastContainer = dynamic(
  // @ts-ignore
  () =>
    import('@vanarama/uibook/lib/components/atoms/toast/Toast').then(
      mod => mod.ToastContainer,
    ),
  {
    ssr: false,
  },
);
const ComparatorBar = dynamic(
  () => import('@vanarama/uibook/lib/components/organisms/comparator-bar'),
  {
    ssr: false,
  },
);
const Modal = dynamic(
  () => import('@vanarama/uibook/lib/components/molecules/modal'),
  {
    ssr: false,
  },
);
const Button = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/button'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const [compareVehicles, setCompareVehicles] = useState<
    IVehicle[] | IVehicleCarousel[] | [] | null | undefined
  >([]);
  const [modalCompareTypeError, setModalCompareTypeError] = useState<
    boolean | undefined
  >(false);
  // const [existComparator, setExistComparator] = useState(false);

  // useEffect(() => {
  //   // Anytime router.push is called, scroll to the top of the page.
  //   // it should be prevent for cases when we make a url replace in search pages after filters changing
  //   Router.events.on('routeChangeComplete', (url: string) => {
  //     const isSearchPage = !!SEARCH_PAGES.find(element =>
  //       url.includes(element),
  //     );
  //     if (!isSearchPage) window.scrollTo(0, 0);
  //   });
  // }, []);

  // useEffect(() => {
  //   pushPageData({ pathname: router.pathname });
  //   const getVehicles = async () => {
  //     const vehiclesCompares = (await getCompares()) as
  //       | IVehicle[]
  //       | IVehicleCarousel[]
  //       | null;
  //     if (vehiclesCompares) {
  //       setCompareVehicles(vehiclesCompares);
  //     }
  //   };
  //   getVehicles();

  //   if (
  //     (PAGES_WITH_COMPARATOR.some(page => router.pathname.includes(page)) &&
  //       !PAGES_WITHOUT_COMPARATOR.some(page =>
  //         router.pathname.includes(page),
  //       )) ||
  //     WHOLE_PATHS_PAGES_WITH_COMPARATOR.some(page => router.pathname === page)
  //   ) {
  //     setExistComparator(true);
  //   } else {
  //     setExistComparator(false);
  //   }
  // }, [router.pathname]);

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

  return (
    <>
      <main
        className={cx(resolveMainClass())}
        style={{ paddingTop: useMobileViewport() ? '46px' : '0' }}
      >
        <HeaderContainer />
        <CompareContext.Provider
          value={{
            compareVehicles,
            compareChange,
          }}
        >
          <Component {...pageProps} />
        </CompareContext.Provider>
        {/* {compareVehicles && compareVehicles.length > 0 && existComparator && ( */}
        {compareVehicles && compareVehicles.length > 0 && (
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
        <LazyLoadComponent visibleByDefault={typeof window === 'undefined'}>
          <FooterContainer />
        </LazyLoadComponent>
      </main>
      <LazyLoadComponent>
        <ToastContainer />
      </LazyLoadComponent>
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
