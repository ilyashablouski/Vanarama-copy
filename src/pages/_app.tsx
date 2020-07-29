import { ToastContainer } from '@vanarama/uibook/lib/components/atoms/toast/Toast';
import Footer from '@vanarama/uibook/lib/components/organisms/footer';
import '@vanarama/uibook/src/components/base.scss';
import { AppProps } from 'next/app';
import { Router } from 'next/router';
import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import ComparatorBar from '@vanarama/uibook/lib/components/organisms/comparator-bar';
import Modal from '@vanarama/uibook/lib/components/molecules/modal';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Header from '../components/Header/Header';
import { PHONE_NUMBER_LINK, TOP_BAR_LINKS } from '../models/enum/HeaderLinks';
import {
  getCompares,
  changeCompares,
  getVehiclesForComparator,
  IVehicle,
} from '../utils/helpers';

const initialState = {
  compareVehicles: [] as IVehicle[] | [],
  setCompareVehicles: (vehicles: IVehicle[] | []) => {},
  setModalCompareTypeError: (show: boolean) => {},
};

export const CompareContext = React.createContext(initialState);

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const LOGIN_LINK = {
    label: 'Login',
    href: `/account/login-register?redirect=${router.asPath}`,
  };

  const [compareVehicles, setCompareVehicles] = useState<IVehicle[] | []>([]);
  const [modalCompareTypeError, setModalCompareTypeError] = useState(false);

  useEffect(() => {
    // Anytime router.push is called, scroll to the top of the page.
    Router.events.on('routeChangeComplete', () => {
      window.scrollTo(0, 0);
    });
  }, []);

  useEffect(() => {
    const getVehicles = async () => {
      const vehiclesCompares = await getCompares();
      if (vehiclesCompares) {
        setCompareVehicles(vehiclesCompares);
      }
    };
    getVehicles();
  }, []);

  const resolveMainClass = () => {
    const isTrailingSlug = (slug: string) => {
      const index = router.asPath.lastIndexOf('-');
      const pathSlug = router.asPath.substr(index);
      return `-${slug}` === pathSlug;
    };

    if (
      isTrailingSlug('details') ||
      router.pathname.includes('[...manufacturer]')
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
        <Header
          loginLink={LOGIN_LINK}
          phoneNumberLink={PHONE_NUMBER_LINK}
          topBarLinks={TOP_BAR_LINKS}
        />
        <CompareContext.Provider
          value={{
            compareVehicles,
            setCompareVehicles,
            setModalCompareTypeError,
          }}
        >
          <Component {...pageProps} />
        </CompareContext.Provider>
        {compareVehicles.length > 0 && (
          <ComparatorBar
            deleteVehicle={async vehicle => {
              const vehicles = await changeCompares(vehicle);
              setCompareVehicles(vehicles);
            }}
            compareVehicles={() => {}}
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
        <Footer
          emailAddress="enquiries@vanarama.co.uk"
          phoneNumber="01442 838 195"
        />
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
