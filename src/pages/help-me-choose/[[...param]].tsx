import dynamic from 'next/dynamic';
import { NextPage } from 'next';
import React, { useCallback, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import BlackFridayBanner from 'core/atoms/black-friday-banner/BlackFridayBanner';
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
  HELP_ME_CHOSE_STEPS,
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
import { isBlackFridayCampaignEnabled } from '../../utils/helpers';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});

const getNextProgressStep = (
  searchParams: string,
  copyInitialSteps: IInitStep,
) => {
  const arrOfSearchParams = searchParams
    .replace('?', '')
    .split('&')
    .map(param => {
      const splitedParam = param.split('=');
      const key = splitedParam[0];
      const value = splitedParam[1].split(',');
      if (key === 'rental' || key === 'initialPeriods') {
        Object.defineProperty(
          copyInitialSteps[key as keyof IInitStep],
          'value',
          {
            value: value[0],
          },
        );
      } else {
        Object.defineProperty(
          copyInitialSteps[key as keyof IInitStep],
          'value',
          { value },
        );
      }
      return [key, value];
    });

  const lastSearchParam = arrOfSearchParams[arrOfSearchParams.length - 1][0];
  const lastStepIndex = HELP_ME_CHOSE_STEPS[lastSearchParam as keyof IInitStep];
  const nextStep = Object.keys(HELP_ME_CHOSE_STEPS).find(
    key => HELP_ME_CHOSE_STEPS[key as keyof IInitStep] === lastStepIndex + 1,
  );

  if (!nextStep) {
    Object.defineProperty(copyInitialSteps.rental, 'active', { value: true });
    Object.defineProperty(copyInitialSteps.initialPeriods, 'active', {
      value: true,
    });
  } else {
    Object.defineProperty(
      copyInitialSteps[nextStep as keyof IInitStep],
      'active',
      { value: true },
    );
  }
};

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
          ...buildAnObjectFromAQuery(
            new URLSearchParams(searchParams),
            copyInitialSteps,
          ),
        };
        getHelpMeChoose({
          variables,
        });
      }
    },
    [getHelpMeChoose, router.query],
  );

  useEffect(() => {
    router.events.on('routeChangeComplete', getData);
    return () => {
      router.events.off('routeChangeComplete', getData);
    };
  }, [getData]);

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

  const pageTitle = Object.values(steps).find(el => el.active)?.title || '';

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
          {isBlackFridayCampaignEnabled() && (
            <BlackFridayBanner
              className="bf-banner--hmc"
              rightText="On every vehicle"
            />
          )}
          <HelpMeChooseProgressIndicator
            steps={steps}
            getHelpMeChoose={getHelpMeChoose}
            setLoadingStatus={setLoadingStatus}
            setPageOffset={setPageOffset}
          />
          {steps.financeTypes.active && (
            <HelpMeChooseAboutYou
              steps={steps}
              getHelpMeChoose={getHelpMeChoose}
              helpMeChooseData={helpMeChooseData}
              setLoadingStatus={setLoadingStatus}
            />
          )}
          {steps.bodyStyles.active && !!bodyStyleData?.length && (
            <HelpMeChooseBodyStyle
              steps={steps}
              getHelpMeChoose={getHelpMeChoose}
              helpMeChooseData={helpMeChooseData}
              setLoadingStatus={setLoadingStatus}
            />
          )}
          {steps.fuelTypes.active && !!fuelTypesData?.length && (
            <HelpMeChooseFuelTypes
              steps={steps}
              getHelpMeChoose={getHelpMeChoose}
              helpMeChooseData={helpMeChooseData}
              setLoadingStatus={setLoadingStatus}
            />
          )}
          {steps.transmissions.active && !!transmissionsData?.length && (
            <HelpMeChooseTransmissions
              steps={steps}
              getHelpMeChoose={getHelpMeChoose}
              helpMeChooseData={helpMeChooseData}
              setLoadingStatus={setLoadingStatus}
            />
          )}
          {steps.terms.active && !!termsData?.length && (
            <HelpMeChooseTerms
              steps={steps}
              getHelpMeChoose={getHelpMeChoose}
              helpMeChooseData={helpMeChooseData}
              setLoadingStatus={setLoadingStatus}
            />
          )}
          {steps.mileages.active && !!mileagesData?.length && (
            <HelpMeChooseMiles
              steps={steps}
              getHelpMeChoose={getHelpMeChoose}
              helpMeChooseData={helpMeChooseData}
              setLoadingStatus={setLoadingStatus}
            />
          )}
          {steps.availability.active && !!availabilityData?.length && (
            <HelpMeChooseAvailability
              steps={steps}
              getHelpMeChoose={getHelpMeChoose}
              helpMeChooseData={helpMeChooseData}
              setLoadingStatus={setLoadingStatus}
            />
          )}
          {steps.rental.active && steps.initialPeriods.active && (
            <HelpMeChooseResult
              steps={steps}
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
