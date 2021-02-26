import dynamic from 'next/dynamic';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import withApollo from '../../hocs/withApollo';
import { PRODUCTS_FILTER_LIST } from '../../gql/help-me-choose';
import { ProductVehicleListInputObject } from '../../../generated/globalTypes';
import {
  ProductVehicleListVariables,
  ProductVehicleList_productVehicleList_edges as Edges,
} from '../../../generated/ProductVehicleList';
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

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});

const HelpMeChoose: NextPage = () => {
  const [steps, setSteps] = useState<IInitStep>(initialSteps);
  const [isLoading, setLoadingStatus] = useState(false);
  const [counterState, setCounterState] = useState(1);
  const [resultsData, setResultsData] = useState<Edges[]>([]);

  const [getProductVehicleList, productVehicleListData] = useLazyQuery<
    ProductVehicleListInputObject,
    ProductVehicleListVariables
  >(PRODUCTS_FILTER_LIST);

  const bodyStyleData = getSectionsData(
    ['productVehicleList', 'aggs', 'capBodyStyle'],
    productVehicleListData?.data,
  );
  const fuelTypesData = getSectionsData(
    ['productVehicleList', 'aggs', 'fuelType'],
    productVehicleListData?.data,
  );
  const transmissionsData = getSectionsData(
    ['productVehicleList', 'aggs', 'transmission'],
    productVehicleListData?.data,
  );
  const termsData = getSectionsData(
    ['productVehicleList', 'aggs', 'term'],
    productVehicleListData?.data,
  );
  const mileagesData = getSectionsData(
    ['productVehicleList', 'aggs', 'mileage'],
    productVehicleListData?.data,
  );
  const availabilityData = getSectionsData(
    ['productVehicleList', 'aggs', 'availability'],
    productVehicleListData?.data,
  );
  const resultsDataArray: Edges[] = getSectionsData(
    ['productVehicleList', 'edges'],
    productVehicleListData?.data,
  );

  useEffect(() => {
    if (window?.location.search.length) {
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
        },
        bodyStyles: {
          active: isBodyStylesActive,
          value: bodyStylesQueryValue,
        },
        fuelTypes: {
          active: isFuelTypesActive,
          value: fuelTypesQueryValue,
        },
        transmissions: {
          active: isTransmissionsActive,
          value: transmissionsQueryValue,
        },
        terms: {
          active: isTermsActive,
          value: termsQueryValue,
        },
        mileages: {
          active: isMileagesActive,
          value: mileagesQueryValue,
        },
        availability: {
          active: isAvailabilityActive,
          value: availabilityQueryValue,
        },
        rental: {
          active: isResultsActive,
          value: rentalQuery as any,
        },
        initialPeriods: {
          active: isResultsActive,
          value: initialPeriodsQuery as any,
        },
      };
      setSteps(stepsFromSearch);
      const variables = {
        filter: {
          ...buildAnObjectFromAQuery(searchParams, stepsFromSearch),
        },
      };
      getProductVehicleList({
        variables,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  if (isLoading) {
    return <Loading size="large" />;
  }

  return (
    <>
      <HelpMeChooseProgressIndicator
        steps={steps}
        setSteps={setSteps}
        getProductVehicleList={getProductVehicleList}
        setLoadingStatus={setLoadingStatus}
      />
      {steps.financeTypes.active && (
        <HelpMeChooseAboutYou
          steps={steps}
          setSteps={setSteps}
          getProductVehicleList={getProductVehicleList}
          productVehicleListData={productVehicleListData}
          setLoadingStatus={setLoadingStatus}
        />
      )}
      {steps.bodyStyles.active && !!bodyStyleData?.length && (
        <HelpMeChooseBodyStyle
          steps={steps}
          setSteps={setSteps}
          getProductVehicleList={getProductVehicleList}
          productVehicleListData={productVehicleListData}
          setLoadingStatus={setLoadingStatus}
        />
      )}
      {steps.fuelTypes.active && !!fuelTypesData?.length && (
        <HelpMeChooseFuelTypes
          steps={steps}
          setSteps={setSteps}
          getProductVehicleList={getProductVehicleList}
          productVehicleListData={productVehicleListData}
          setLoadingStatus={setLoadingStatus}
        />
      )}
      {steps.transmissions.active && !!transmissionsData?.length && (
        <HelpMeChooseTransmissions
          steps={steps}
          setSteps={setSteps}
          getProductVehicleList={getProductVehicleList}
          productVehicleListData={productVehicleListData}
          setLoadingStatus={setLoadingStatus}
        />
      )}
      {steps.terms.active && !!termsData?.length && (
        <HelpMeChooseTerms
          steps={steps}
          setSteps={setSteps}
          getProductVehicleList={getProductVehicleList}
          productVehicleListData={productVehicleListData}
          setLoadingStatus={setLoadingStatus}
        />
      )}
      {steps.mileages.active && !!mileagesData?.length && (
        <HelpMeChooseMiles
          steps={steps}
          setSteps={setSteps}
          getProductVehicleList={getProductVehicleList}
          productVehicleListData={productVehicleListData}
          setLoadingStatus={setLoadingStatus}
        />
      )}
      {steps.availability.active && !!availabilityData?.length && (
        <HelpMeChooseAvailability
          steps={steps}
          setSteps={setSteps}
          getProductVehicleList={getProductVehicleList}
          productVehicleListData={productVehicleListData}
          setLoadingStatus={setLoadingStatus}
        />
      )}
      {steps.rental.active &&
        steps.initialPeriods.active &&
        !!resultsDataArray && (
          <HelpMeChooseResult
            steps={steps}
            setSteps={setSteps}
            getProductVehicleList={getProductVehicleList}
            productVehicleListData={productVehicleListData}
            setLoadingStatus={setLoadingStatus}
            counterState={counterState}
            setCounterState={setCounterState}
            resultsData={resultsData}
            setResultsData={setResultsData}
          />
        )}
    </>
  );
};

export default withApollo(HelpMeChoose);
