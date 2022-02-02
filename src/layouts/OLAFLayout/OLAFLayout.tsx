import React, { useState, useEffect, ReactNode, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useStoredOrderQuery } from 'gql/storedOrder';

import ChevronUpSharp from 'core/assets/icons/ChevronUpSharp';
import ChevronDownSharp from 'core/assets/icons/ChevronDownSharp';
import Button from 'core/atoms/button';
import OlafCard from 'core/molecules/cards/OlafCard/OlafCard';
import Modal from 'core/molecules/modal';

import BusinessProgressIndicator from '../../components/BusinessProgressIndicator/BusinessProgressIndicator';
import ConsumerProgressIndicator from '../../components/ConsumerProgressIndicator/ConsumerProgressIndicator';
import { useMobileViewport } from '../../hooks/useMediaQuery';
import { useCarDerivativeData } from '../../gql/order';
import useSessionState from '../../gql/session';
import {
  createOlafDetails,
  getFunderName,
  getFunderTerm,
  OlafContext,
  olafTitleMapper,
} from './helpers';
import {
  GetDerivative_derivative,
  GetDerivative_vehicleImages as VehicleImages,
} from '../../../generated/GetDerivative';
import {
  OrderInputObject,
  VehicleTypeEnum,
} from '../../../generated/globalTypes';
import { useGetLeaseCompanyDataByOrderUuid } from '../../gql/creditApplication';
import Head from '../../components/Head/Head';
import Banner from '../../components/Banner/Banner';
import Heading from '../../core/atoms/heading';
import Text from '../../core/atoms/text';
import Card from '../../core/molecules/cards/Card';
import List from '../../core/atoms/list';
import Icon from '../../core/atoms/icon';
import Checkmark from '../../core/assets/icons/Checkmark';

import { isSessionFinishedCache } from '../../cache';

interface IProps {
  setDetailsData?: React.Dispatch<
    React.SetStateAction<OrderInputObject | null>
  >;
  setDerivativeData?: React.Dispatch<
    React.SetStateAction<GetDerivative_derivative | null>
  >;
  children?: ReactNode;
}

const YOUR_NEEDS = [
  {
    label: "Details of the address you've lived at covering three years",
    key: '0',
  },
  {
    label:
      "Details of the bank account that you'll use to pay the monthly payments",
    key: '1',
  },
];

const VANARAMA_ADVANTAGES = [
  {
    label: 'Free Loss Of Earnings & Live Event Cover*',
    key: '0',
  },
  {
    label: 'Free 30-Day Returns*',
    key: '1',
  },
  {
    label: 'Price Promise Guarantee*',
    key: '2',
  },
  {
    label: 'No Admin Fees',
    key: '3',
    dataAbTestId: 'online-application-form_list_no-admin-fees',
  },
  {
    label: 'Free, Safe & Contactless Delivery',
    key: '4',
  },
  {
    label: 'Rated Excellent On Trust Pilot',
    key: '5',
  },
];

const LEASING_ADVANTAGES = [
  {
    label: 'Brand New Vehicles',
    key: '0',
  },
  {
    label: ' Fixed Monthly',
    key: '1',
  },
  {
    label: 'Full Manufacturer Warranty',
    key: '2',
  },
  {
    label: 'No MOT Costs For 3 Years',
    key: '3',
  },
];

const OLAFLayout: React.FC<IProps> = ({
  children,
  setDetailsData,
  setDerivativeData,
}) => {
  const router = useRouter();
  const { data } = useStoredOrderQuery();
  const order = data?.storedOrder?.order || null;
  const rating = data?.storedOrder?.rating ?? undefined;

  const [
    getLeaseData,
    { data: leaseData, loading: leaseDataLoading },
  ] = useGetLeaseCompanyDataByOrderUuid(order?.uuid || '');
  const { data: sessionState } = useSessionState();

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
    if (sessionState?.isSessionFinished) {
      setModalVisibility(true);
    }
  }, [sessionState]);

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
    if (order?.uuid) {
      getLeaseData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order?.uuid]);

  const funder = useMemo(() => getFunderName(leaseData), [leaseData]);
  const term = useMemo(() => getFunderTerm(leaseData, order), [
    leaseData,
    order,
  ]);

  const meta = useMemo(() => {
    // make reverse for get last route for first
    const pathnameArray = router.pathname.split('/').reverse();
    const titleKey = Object.keys(olafTitleMapper).find(key =>
      pathnameArray.includes(key),
    );
    const title = titleKey ? olafTitleMapper[titleKey] : 'Vanarama';

    return {
      title,
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

  // get saved url of order's pdp page and delete error
  const handleNewSessionStart = () => {
    isSessionFinishedCache(false);

    router.replace(
      `/${derivativeData.data?.vehicleConfigurationByCapId?.url || ''}`,
    );
  };

  const isCar = derivative?.vehicleType === VehicleTypeEnum.CAR;
  const isVan =
    derivative?.vehicleType === VehicleTypeEnum.LCV &&
    !derivative?.name?.toLowerCase().includes('pick up');
  const isBenefitsVisible = router.asPath.includes('about');

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
        <OlafContext.Provider
          value={{
            funderName: funder,
            requiredMonths: term,
            leaseDataLoading,
          }}
        >
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
                score: rating,
                dataTestId: 'olaf_about_title_derivative',
                size: 'large',
                ratingSize: 'lead',
              }}
              roadsideAssistance={
                derivativeData?.data?.vehicleDetails?.roadsideAssistance
              }
              warrantyDetails={
                derivativeData?.data?.vehicleDetails?.warrantyDetails
              }
            />
            {isBenefitsVisible && (
              <>
                <Card className="-mt-400">
                  <Heading size="lead" color="black">
                    You Will Need:
                  </Heading>
                  <List>
                    {YOUR_NEEDS.map(item => (
                      <li className="-custom" key={item.key}>
                        <Icon
                          size="regular"
                          color="teal"
                          icon={<Checkmark />}
                        />
                        {item.label}
                      </li>
                    ))}
                  </List>
                </Card>
                <div className="pdp">
                  {(isCar || isVan) && (
                    <Banner vans={isVan} className="-mt-500" />
                  )}
                </div>
                <Card className="-mt-500">
                  <Heading size="lead" color="black">
                    Why Choose Vanarama?
                  </Heading>
                  <List>
                    {VANARAMA_ADVANTAGES.map(item => (
                      <li
                        className="-custom"
                        key={item.key}
                        data-abtestid={item.dataAbTestId}
                      >
                        <Icon
                          size="regular"
                          color="teal"
                          icon={<Checkmark />}
                        />
                        {item.label}
                      </li>
                    ))}
                  </List>
                </Card>
                <Card className="-mt-500">
                  <Heading size="lead" color="black">
                    Why Choose Leasing?
                  </Heading>
                  <List>
                    {LEASING_ADVANTAGES.map(item => (
                      <li className="-custom" key={item.key}>
                        <Icon
                          size="regular"
                          color="teal"
                          icon={<Checkmark />}
                        />
                        {item.label}
                      </li>
                    ))}
                  </List>
                </Card>
              </>
            )}
            <div className="text -small description-block">
              {isBenefitsVisible && (
                <span>* Subject to terms and conditions.</span>
              )}
              <span>
                ** Charges will apply at the end of your lease if you exceed
                your agreed mileage.
              </span>
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
