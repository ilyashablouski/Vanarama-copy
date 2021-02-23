/* eslint-disable @typescript-eslint/camelcase */
import ChevronDownSharp from 'core/assets/icons/ChevronDownSharp';
import ChevronUpSharp from 'core/assets/icons/ChevronUpSharp';
import Button from 'core/atoms/button';
import OlafCard from 'core/molecules/cards/OlafCard/OlafCard';
import { useRouter } from 'next/router';
import React, { useState, useEffect, ReactNode, useMemo } from 'react';
import localforage from 'localforage';
import Modal from 'core/molecules/modal';
import BusinessProgressIndicator from '../../components/BusinessProgressIndicator/BusinessProgressIndicator';
import ConsumerProgressIndicator from '../../components/ConsumerProgressIndicator/ConsumerProgressIndicator';
import { useMobileViewport } from '../../hooks/useMediaQuery';
import { useCarDerivativeData } from '../../gql/order';
import {
  createOlafDetails,
  getFunderTerm,
  OlafContext,
  olafTitleMapper,
} from './helpers';
import {
  GetDerivative_derivative,
  GetDerivative_vehicleImages as VehicleImages,
} from '../../../generated/GetDerivative';
import useGetOrder from '../../hooks/useGetOrder';
import { OrderInputObject } from '../../../generated/globalTypes';
import useGetOrderId from '../../hooks/useGetOrderId';
import { useGetLeaseCompanyDataByOrderUuid } from '../../gql/creditApplication';
import Head from '../../components/Head/Head';
import Heading from '../../core/atoms/heading';
import Text from '../../core/atoms/text';

const SESSION_ERROR_KEY = 'isSessionFinished';

interface IProps {
  setDetailsData?: React.Dispatch<
    React.SetStateAction<OrderInputObject | null>
  >;
  setDerivativeData?: React.Dispatch<
    React.SetStateAction<GetDerivative_derivative | null>
  >;
  children?: ReactNode;
}

const OLAFLayout: React.FC<IProps> = ({
  children,
  setDetailsData,
  setDerivativeData,
}) => {
  const router = useRouter();
  const order = useGetOrder();
  const orderId = useGetOrderId();
  const [getLeaseData, { data: leaseData }] = useGetLeaseCompanyDataByOrderUuid(
    orderId,
  );

  const [isModalVisible, setModalVisibility] = useState(false);
  const isMobile = useMobileViewport();
  const [asideOpen, setAsideOpen] = useState(false);
  const showAside = !isMobile || asideOpen;

  const vehicleProduct = order?.lineItems?.[0]?.vehicleProduct;

  const [getDerivativeData, derivativeData] = useCarDerivativeData(
    vehicleProduct?.derivativeCapId || '',
    vehicleProduct?.vehicleType,
  );
  const derivative = derivativeData && derivativeData.data?.derivative;
  const mainImage =
    derivativeData &&
    derivativeData.data?.vehicleImages &&
    (derivativeData.data?.vehicleImages as VehicleImages[])[0]?.mainImageUrl;

  useEffect(() => {
    localforage.getItem<boolean>(SESSION_ERROR_KEY).then(value => {
      if (value) {
        setModalVisibility(true);
      }
    });
  });

  useEffect(() => {
    if (vehicleProduct) {
      getDerivativeData();
    }
  }, [vehicleProduct, getDerivativeData]);

  useEffect(() => {
    if (order && derivativeData.data && setDetailsData && setDerivativeData) {
      setDetailsData(order);
      setDerivativeData(derivativeData.data.derivative);
    }
  }, [order, setDerivativeData, setDetailsData, derivativeData]);

  useEffect(() => {
    if (orderId) {
      getLeaseData();
    }
  }, [orderId]);

  const term = useMemo(() => getFunderTerm(leaseData, order), [
    leaseData,
    order,
  ]);
  const meta = useMemo(() => {
    const pathnameArray = router.pathname.split('/');
    const [, title] = Object.entries(olafTitleMapper).find(([key]) =>
      pathnameArray.includes(key),
    );
    return {
      title: title || 'Vanarama',
      name: null,
      metaRobots: null,
      metaDescription: null,
      legacyUrl: null,
      pageType: null,
      canonicalUrl: null,
      slug: null,
      schema: null,
      publishedOn: null,
      breadcrumbs: null,
    };
  }, [router.pathname]);

  const handleNewSessionStart = () => {
    // get saved url of order's pdp page and delete error
    Promise.all([
      localforage.getItem<string>('orderUrl'),
      localforage.removeItem(SESSION_ERROR_KEY),
    ]).then(([url]) => router.push(url, url));
  };

  return (
    <>
      <Head metaData={meta} />
      <ProgressSection />
      {isMobile && (
        <Button
          className="-fullwidth -mv-400"
          dataTestId="olaf-aside-toggle"
          icon={asideOpen ? <ChevronUpSharp /> : <ChevronDownSharp />}
          iconColor="white"
          iconPosition="after"
          label={asideOpen ? 'Hide Your Order' : 'View Your Order'}
          onClick={() => setAsideOpen(prev => !prev)}
        />
      )}
      <div className="row:olaf">
        <OlafContext.Provider value={{ requiredMonths: term }}>
          {children}
        </OlafContext.Provider>
        {showAside && order && derivative && (
          <div className="olaf-aside">
            <OlafCard
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
              header={{
                text: `${vehicleProduct?.leadTime} †` || '',
              }}
              olafDetails={createOlafDetails(
                order.leaseType,
                vehicleProduct!,
                derivative,
              )}
              initialRentalDataTestId="about_intial-rental-testID"
              controlLengthDataTestId="about_control-length-testID"
              annualMileageDataTestId="about_annual-mileage-testID"
              annualMileageBoosterDataTestId="about_annual-milage-booster-testID"
              damageCoverDataTestId="about_damage-cover-testID"
              maintenanceDataTestId="about_maintenance-testID"
              fuelDataTestId="about_fuel-testID"
              transmissionDataTestId="about_transmission-testID"
              colorDataTestId="about_color-testID"
              trimDataTestId="about_trim-testID"
              descriptionDataTestId="about_description-testID"
              imageSrc={mainImage || ''}
              title={{
                title: `${derivative?.manufacturer.name || ''} ${derivative
                  ?.model.name || ''}`,
                description: derivative?.name || '',
                score: order?.rating,
                dataTestId: 'olaf_about_title_derivative',
                size: 'large',
                ratingSize: 'lead',
              }}
            />
            <div className="text -small description-block">
              <span>** Excess mileage charges apply.</span>
              <span>† After we’ve received your eSigned documents.</span>
            </div>
          </div>
        )}
      </div>
      <Modal show={isModalVisible} containerClassName="modal-container-large">
        <div className="-mb-400">
          <div className="-mb-600">
            <Heading
              className="-mb-300"
              color="black"
              dataTestId="about-you_heading"
              size="xlarge"
              tag="h1"
            >
              Your Session Has Timed Out
            </Heading>
            <Text size="large" color="black">
              We’re sorry, it looks like your session has expired. For security
              reasons, sessions automatically end if there’s no activity for 1
              hour. Don’t worry, none of your personal information has been
              saved.
            </Text>
          </div>
          <Button
            label="Start Again"
            size="regular"
            fill="solid"
            color="teal"
            onClick={handleNewSessionStart}
            type="button"
          />
        </div>
      </Modal>
    </>
  );
};

type QueryParams = {
  isSoleTraderJourney: boolean;
};

function ProgressSection() {
  const { pathname, query } = useRouter();
  const { isSoleTraderJourney } = (query as unknown) as QueryParams;
  const hideProgress = pathname.includes('/olaf/thank-you');
  if (hideProgress) {
    return null;
  }
  const soleTraderPathMatchResult = pathname.match(
    /^\/b2b\/olaf\/sole-trader\/.+/,
  );
  const isSoleTrader =
    (soleTraderPathMatchResult || []).length > 0 || isSoleTraderJourney;
  const isB2BJourney = pathname.match(/^\/b2b\/.+/);

  return (
    <div className="row:progress">
      {isB2BJourney ? (
        <BusinessProgressIndicator isSoleTraderJourney={isSoleTrader} />
      ) : (
        <ConsumerProgressIndicator />
      )}
    </div>
  );
}

export default OLAFLayout;
