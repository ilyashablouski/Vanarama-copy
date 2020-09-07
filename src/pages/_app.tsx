import { ToastContainer } from '@vanarama/uibook/lib/components/atoms/toast/Toast';
import '@vanarama/uibook/src/components/base.scss';
import { AppProps } from 'next/app';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import ComparatorBar from '@vanarama/uibook/lib/components/organisms/comparator-bar';
import Modal from '@vanarama/uibook/lib/components/molecules/modal';
import Button from '@vanarama/uibook/lib/components/atoms/button';
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

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const [compareVehicles, setCompareVehicles] = useState<
    IVehicle[] | IVehicleCarousel[] | [] | null | undefined
  >([]);
  const [modalCompareTypeError, setModalCompareTypeError] = useState<
    boolean | undefined
  >(false);
  const [existComparator, setExistComparator] = useState(false);

  useEffect(() => {
    // Anytime router.push is called, scroll to the top of the page.
    Router.events.on('routeChangeComplete', () => {
      window.scrollTo(0, 0);
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
      <ToastContainer />
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

export default MyApp;
