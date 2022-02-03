import dynamic from 'next/dynamic';
import { NextPage } from 'next';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
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
  getNextProgressStep,
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
  const router = useRouter();

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
    ['helpMeChoose', 'aggregation', 'lqBodyStyle'],
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

  const getData = useCallback(
    url => {
      if (url) {
        const searchParams = url?.replace('/help-me-choose', '');
        const copyInitialSteps = JSON.parse(JSON.stringify(initialSteps));
        if (window.location.search.length === 0) {
          copyInitialSteps.financeTypes.active = true;
        } else {
          getNextProgressStep(searchParams, copyInitialSteps);
        }
        setSteps(copyInitialSteps);

        const variables = {
          ...buildAnObjectFromAQuery(copyInitialSteps),
        };
        getHelpMeChoose({
          variables,
        });
      }
    },
    [getHelpMeChoose],
  );

  useEffect(() => {
    router.events.on('routeChangeComplete', getData);
    return () => {
      router.events.off('routeChangeComplete', getData);
    };
  }, [getData, router.events]);

  useEffect(() => {
    let animation: NodeJS.Timeout;
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

  const pageTitle = useMemo(
    () => Object.values(steps).find(el => el.active)?.title || '',
    [steps],
  );

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
      {isLoading || !pageTitle ? (
        <Loading size="large" />
      ) : (
        <>
          <HelpMeChooseProgressIndicator
            steps={steps}
            setLoadingStatus={setLoadingStatus}
            setPageOffset={setPageOffset}
          />
          {steps.financeTypes.active && (
            <HelpMeChooseAboutYou
              steps={steps}
              helpMeChooseData={helpMeChooseData}
              setLoadingStatus={setLoadingStatus}
              dataUiTestId="help-me-choose_about-you"
            />
          )}
          {steps.bodyStyles.active && !!bodyStyleData?.length && (
            <HelpMeChooseBodyStyle
              steps={steps}
              helpMeChooseData={helpMeChooseData}
              setLoadingStatus={setLoadingStatus}
              dataUiTestId="help-me-choose_body-style"
            />
          )}
          {steps.fuelTypes.active && !!fuelTypesData?.length && (
            <HelpMeChooseFuelTypes
              steps={steps}
              helpMeChooseData={helpMeChooseData}
              setLoadingStatus={setLoadingStatus}
              dataUiTestId="help-me-choose_fuel-types"
            />
          )}
          {steps.transmissions.active && !!transmissionsData?.length && (
            <HelpMeChooseTransmissions
              steps={steps}
              helpMeChooseData={helpMeChooseData}
              setLoadingStatus={setLoadingStatus}
              dataUiTestId="help-me-choose_transmissions"
            />
          )}
          {steps.terms.active && !!termsData?.length && (
            <HelpMeChooseTerms
              steps={steps}
              helpMeChooseData={helpMeChooseData}
              setLoadingStatus={setLoadingStatus}
              dataUiTestId="help-me-choose_terms"
            />
          )}
          {steps.mileages.active && !!mileagesData?.length && (
            <HelpMeChooseMiles
              steps={steps}
              helpMeChooseData={helpMeChooseData}
              setLoadingStatus={setLoadingStatus}
              dataUiTestId="help-me-choose_miles"
            />
          )}
          {steps.availability.active && !!availabilityData?.length && (
            <HelpMeChooseAvailability
              steps={steps}
              helpMeChooseData={helpMeChooseData}
              setLoadingStatus={setLoadingStatus}
              dataUiTestId="help-me-choose_availability"
            />
          )}
          {steps.rental.active && steps.initialPeriods.active && (
            <HelpMeChooseResult
              steps={steps}
              helpMeChooseData={helpMeChooseData}
              setLoadingStatus={setLoadingStatus}
              counterState={counterState}
              setCounterState={setCounterState}
              resultsData={resultsData}
              setResultsData={setResultsData}
              setPageOffset={setPageOffset}
              dataUiTestId="help-me-choose_result"
            />
          )}
        </>
      )}
      <Head metaData={metaData} featuredImage={null} />
    </>
  );
};

export default withApollo(HelpMeChoose);
