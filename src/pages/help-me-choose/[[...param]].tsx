import dynamic from 'next/dynamic';
import { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import withApollo from '../../hocs/withApollo';
import { HELP_ME_CHOOSE } from '../../gql/help-me-choose';
import { FilterListObject } from '../../../generated/globalTypes';
import {
  HelpMeChooseVariables,
  HelpMeChoose_helpMeChoose_vehicles as Vehicles,
} from '../../../generated/HelpMeChoose';
import {
  buildAnObjectFromAQuery,
  IInitStep,
  initialSteps,
} from '../../containers/HelpMeChooseContainer/helpers';
import { getSectionsData } from '../../utils/getSectionsData';
import HelpMeChooseAboutYou from '../../containers/HelpMeChooseContainer/HelpMeChooseBlocks/HelpMeChooseAboutYou';
import HelpMeChooseBodyStyle from '../../containers/HelpMeChooseContainer/HelpMeChooseBlocks/HelpMeChooseBodyStyle';
import HelpMeChooseFuelTypes from '../../containers/HelpMeChooseContainer/HelpMeChooseBlocks/HelpMeChooseFuelTypes';
import HelpMeChooseTransmissions from '../../containers/HelpMeChooseContainer/HelpMeChooseBlocks/HelpMeChooseTransmissions';
import HelpMeChooseTerms from '../../containers/HelpMeChooseContainer/HelpMeChooseBlocks/HelpMeChooseTerms';
import HelpMeChooseMiles from '../../containers/HelpMeChooseContainer/HelpMeChooseBlocks/HelpMeChooseMiles';
import HelpMeChooseAvailability from '../../containers/HelpMeChooseContainer/HelpMeChooseBlocks/HelpMeChooseAvailability';
import HelpMeChooseResult from '../../containers/HelpMeChooseContainer/HelpMeChooseBlocks/HelpMeChooseResult';
import Skeleton from '../../components/Skeleton';
import HelpMeChooseProgressIndicator from '../../components/HelpMeChooseProgressIndicator/HelpMeChooseProgressIndicator';
import Head from '../../components/Head/Head';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});

const HelpMeChoose: NextPage = () => {
  const [steps, setSteps] = useState<IInitStep>(initialSteps);
  const [isLoading, setLoadingStatus] = useState(false);
  const [counterState, setCounterState] = useState(1);
  const [resultsData, setResultsData] = useState<Vehicles[]>([]);
  const [pageOffset, setPageOffset] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      window.scrollTo({
        top: pageOffset,
        // @ts-ignore
        behavior: 'instant',
      });
    }
  }, [isLoading, pageOffset]);

  const [getHelpMeChoose, helpMeChooseData] = useLazyQuery<
    FilterListObject,
    HelpMeChooseVariables
  >(HELP_ME_CHOOSE);

  const bodyStyleData = getSectionsData(
    ['helpMeChoose', 'aggregation', 'capBodyStyle'],
    helpMeChooseData?.data,
  );
  const fuelTypesData = getSectionsData(
    ['helpMeChoose', 'aggregation', 'fuelType'],
    helpMeChooseData?.data,
  );
  const transmissionsData = getSectionsData(
    ['helpMeChoose', 'aggregation', 'transmission'],
    helpMeChooseData?.data,
  );
  const termsData = getSectionsData(
    ['helpMeChoose', 'aggregation', 'term'],
    helpMeChooseData?.data,
  );
  const mileagesData = getSectionsData(
    ['helpMeChoose', 'aggregation', 'mileage'],
    helpMeChooseData?.data,
  );
  const availabilityData = getSectionsData(
    ['helpMeChoose', 'aggregation', 'availability'],
    helpMeChooseData?.data,
  );
  const resultsDataArray: Vehicles[] = getSectionsData(
    ['helpMeChoose', 'vehicles'],
    helpMeChooseData?.data,
  );

  const getData = useCallback(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const financeTypesQueryValue = searchParams.getAll('financeTypes');
    const bodyStylesQuery = searchParams.getAll('bodyStyles');
    const fuelTypesQuery = searchParams.getAll('fuelTypes');
    const transmissionsQuery = searchParams.getAll('transmissions');
    const termsQuery = searchParams.getAll('terms');
    const mileagesQuery = searchParams.getAll('mileages');
    const availabilityQuery = searchParams.getAll('availability');
    const rentalQuery = searchParams.get('rental');
    const initialPeriodsQuery = searchParams.get('initialPeriods');
    const bodyStylesQueryValue = bodyStylesQuery.length
      ? bodyStylesQuery[0].split(',')
      : [];
    const fuelTypesQueryValue = fuelTypesQuery.length
      ? fuelTypesQuery[0].split(',')
      : [];
    const transmissionsQueryValue = transmissionsQuery.length
      ? transmissionsQuery[0].split(',')
      : [];
    const termsQueryValue = termsQuery.length ? termsQuery[0].split(',') : [];
    const mileagesQueryValue = mileagesQuery.length
      ? mileagesQuery[0].split(',')
      : [];
    const availabilityQueryValue = availabilityQuery.length
      ? availabilityQuery[0].split(',')
      : [];
    const isFinanceTypesActive =
      searchParams.has('financeTypes') && !searchParams.has('bodyStyles');
    const isBodyStylesActive =
      searchParams.has('bodyStyles') && !searchParams.has('fuelTypes');
    const isFuelTypesActive =
      searchParams.has('fuelTypes') && !searchParams.has('transmissions');
    const isTransmissionsActive =
      searchParams.has('transmissions') && !searchParams.has('terms');
    const isTermsActive =
      searchParams.has('terms') && !searchParams.has('mileages');
    const isMileagesActive =
      searchParams.has('mileages') && !searchParams.has('availability');
    const isAvailabilityActive =
      searchParams.has('availability') &&
      !(searchParams.has('initialPeriods') || searchParams.has('rental'));
    const isResultsActive =
      searchParams.has('rental') || searchParams.has('initialPeriods');
    const stepsFromSearch = {
      financeTypes: {
        active: isFinanceTypesActive,
        value: financeTypesQueryValue,
        title: 'About You',
      },
      bodyStyles: {
        active: isBodyStylesActive,
        value: bodyStylesQueryValue,
        title: 'Style',
      },
      fuelTypes: {
        active: isFuelTypesActive,
        value: fuelTypesQueryValue,
        title: 'Fuel Types',
      },
      transmissions: {
        active: isTransmissionsActive,
        value: transmissionsQueryValue,
        title: 'Gearbox',
      },
      terms: {
        active: isTermsActive,
        value: termsQueryValue,
        title: 'Lease Length',
      },
      mileages: {
        active: isMileagesActive,
        value: mileagesQueryValue,
        title: 'Mileage',
      },
      availability: {
        active: isAvailabilityActive,
        value: availabilityQueryValue,
        title: 'Availability',
      },
      rental: {
        active: isResultsActive,
        value: rentalQuery as any,
        title: 'Results',
      },
      initialPeriods: {
        active: isResultsActive,
        value: initialPeriodsQuery as any,
        title: 'Results',
      },
    };
    setSteps(stepsFromSearch);
    const variables = {
      ...buildAnObjectFromAQuery(searchParams, stepsFromSearch),
    };
    getHelpMeChoose({
      variables,
    });
  }, [getHelpMeChoose]);

  useEffect(() => {
    if (window?.location.search.length) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', getData);
    return () => {
      window.removeEventListener('popstate', getData);
    };
  }, [getData]);

  useEffect(() => {
    let animation: any;
    if (isLoading) {
      animation = setTimeout(() => {
        // endAnimation();
        setLoadingStatus(false);
      }, 1500);
    }
    return () => {
      clearTimeout(animation);
    };
  }, [isLoading]);

  const pageTitle = Object.values(steps).find(el => el.active).title;

  const metaData = {
    title: `${pageTitle} Help Me Choose | Vanarama` || null,
    name: '' || null,
    metaRobots: '' || null,
    metaDescription:
      `${pageTitle} help me choose at Vanarama. ✅ 5* Customer Service ✅ Brand-New ✅ Free Delivery ✅ Road Tax Included` ||
      null,
    publishedOn: '' || null,
    legacyUrl: '' || null,
    pageType: '' || null,
    canonicalUrl: '' || null,
    slug: '' || null,
    schema: null,
    breadcrumbs: null,
  };

  return (
    <>
      {isLoading ? (
        <Loading size="large" />
      ) : (
        <>
          <HelpMeChooseProgressIndicator
            steps={steps}
            setSteps={setSteps}
            getHelpMeChoose={getHelpMeChoose}
            setLoadingStatus={setLoadingStatus}
          />
          {steps.financeTypes.active && (
            <HelpMeChooseAboutYou
              steps={steps}
              setSteps={setSteps}
              getHelpMeChoose={getHelpMeChoose}
              helpMeChooseData={helpMeChooseData}
              setLoadingStatus={setLoadingStatus}
            />
          )}
          {steps.bodyStyles.active && !!bodyStyleData?.length && (
            <HelpMeChooseBodyStyle
              steps={steps}
              setSteps={setSteps}
              getHelpMeChoose={getHelpMeChoose}
              helpMeChooseData={helpMeChooseData}
              setLoadingStatus={setLoadingStatus}
            />
          )}
          {steps.fuelTypes.active && !!fuelTypesData?.length && (
            <HelpMeChooseFuelTypes
              steps={steps}
              setSteps={setSteps}
              getHelpMeChoose={getHelpMeChoose}
              helpMeChooseData={helpMeChooseData}
              setLoadingStatus={setLoadingStatus}
            />
          )}
          {steps.transmissions.active && !!transmissionsData?.length && (
            <HelpMeChooseTransmissions
              steps={steps}
              setSteps={setSteps}
              getHelpMeChoose={getHelpMeChoose}
              helpMeChooseData={helpMeChooseData}
              setLoadingStatus={setLoadingStatus}
            />
          )}
          {steps.terms.active && !!termsData?.length && (
            <HelpMeChooseTerms
              steps={steps}
              setSteps={setSteps}
              getHelpMeChoose={getHelpMeChoose}
              helpMeChooseData={helpMeChooseData}
              setLoadingStatus={setLoadingStatus}
            />
          )}
          {steps.mileages.active && !!mileagesData?.length && (
            <HelpMeChooseMiles
              steps={steps}
              setSteps={setSteps}
              getHelpMeChoose={getHelpMeChoose}
              helpMeChooseData={helpMeChooseData}
              setLoadingStatus={setLoadingStatus}
            />
          )}
          {steps.availability.active && !!availabilityData?.length && (
            <HelpMeChooseAvailability
              steps={steps}
              setSteps={setSteps}
              getHelpMeChoose={getHelpMeChoose}
              helpMeChooseData={helpMeChooseData}
              setLoadingStatus={setLoadingStatus}
            />
          )}
          {steps.rental.active &&
            steps.initialPeriods.active &&
            !!resultsDataArray && (
              <HelpMeChooseResult
                steps={steps}
                setSteps={setSteps}
                getHelpMeChoose={getHelpMeChoose}
                helpMeChooseData={helpMeChooseData}
                setLoadingStatus={setLoadingStatus}
                counterState={counterState}
                setCounterState={setCounterState}
                resultsData={resultsData}
                setResultsData={setResultsData}
                setPageOffset={setPageOffset}
              />
            )}
        </>
      )}
      <Head metaData={metaData} featuredImage={null} />
    </>
  );
};

export default withApollo(HelpMeChoose);
