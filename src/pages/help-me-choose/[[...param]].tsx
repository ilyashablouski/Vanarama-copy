import dynamic from 'next/dynamic';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import withApollo from '../../hocs/withApollo';
import { PRODUCTS_FILTER_LIST } from '../../gql/help-me-choose';
import {
  ProductVehicleListInputObject,
  VehicleTypeEnum,
} from '../../../generated/globalTypes';
import { ProductVehicleListVariables } from '../../../generated/ProductVehicleList';
import {
  buildAnObjectFromAQuery,
  IInitStep,
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

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});

const initialSteps: IInitStep = {
  financeTypes: {
    active: true,
    value: 'PCH' as any,
  },
  bodyStyles: {
    active: false,
    value: [],
  },
  fuelTypes: {
    active: false,
    value: [],
  },
  transmissions: {
    active: false,
    value: [],
  },
  terms: {
    active: false,
    value: '' as any,
  },
  mileages: {
    active: false,
    value: '' as any,
  },
  availability: {
    active: false,
    value: '' as any,
  },
  rental: {
    active: false,
    value: '' as any,
  },
  initialPeriods: {
    active: false,
    value: '' as any,
  },
};

const HelpMeChoose: NextPage = () => {
  const [steps, setSteps] = useState<IInitStep>(initialSteps);

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

  useEffect(() => {
    if (window?.location.search.length) {
      const searchParams = new URLSearchParams(window.location.search);
      const financeTypesQueryValue = searchParams.get('financeTypes');
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
      setSteps({
        financeTypes: {
          active: isFinanceTypesActive,
          value: financeTypesQueryValue as any,
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
          value: termsQueryValue as any,
        },
        mileages: {
          active: isMileagesActive,
          value: mileagesQueryValue as any,
        },
        availability: {
          active: isAvailabilityActive,
          value: availabilityQueryValue as any,
        },
        rental: {
          active: isResultsActive,
          value: rentalQuery as any,
        },
        initialPeriods: {
          active: isResultsActive,
          value: initialPeriodsQuery as any,
        },
      });
      const variables = {
        filter: {
          ...buildAnObjectFromAQuery(searchParams, steps),
          vehicleTypes: [VehicleTypeEnum.CAR],
        },
      };
      getProductVehicleList({
        variables,
      });
    }
  }, [getProductVehicleList, steps]);

  if (productVehicleListData.loading) {
    return <Loading size="large" />;
  }

  return (
    <>
      {steps.financeTypes.active && (
        <HelpMeChooseAboutYou
          steps={steps}
          setSteps={setSteps}
          getProductVehicleList={getProductVehicleList}
          productVehicleListData={productVehicleListData}
        />
      )}
      {steps.bodyStyles.active && bodyStyleData?.length && (
        <HelpMeChooseBodyStyle
          steps={steps}
          setSteps={setSteps}
          getProductVehicleList={getProductVehicleList}
          productVehicleListData={productVehicleListData}
        />
      )}
      {steps.fuelTypes.active && fuelTypesData?.length && (
        <HelpMeChooseFuelTypes
          steps={steps}
          setSteps={setSteps}
          getProductVehicleList={getProductVehicleList}
          productVehicleListData={productVehicleListData}
        />
      )}
      {steps.transmissions.active && transmissionsData?.length && (
        <HelpMeChooseTransmissions
          steps={steps}
          setSteps={setSteps}
          getProductVehicleList={getProductVehicleList}
          productVehicleListData={productVehicleListData}
        />
      )}
      {steps.terms.active && termsData?.length && (
        <HelpMeChooseTerms
          steps={steps}
          setSteps={setSteps}
          getProductVehicleList={getProductVehicleList}
          productVehicleListData={productVehicleListData}
        />
      )}
      {steps.mileages.active && mileagesData?.length && (
        <HelpMeChooseMiles
          steps={steps}
          setSteps={setSteps}
          getProductVehicleList={getProductVehicleList}
          productVehicleListData={productVehicleListData}
        />
      )}
      {steps.availability.active && (
        <HelpMeChooseAvailability
          steps={steps}
          setSteps={setSteps}
          getProductVehicleList={getProductVehicleList}
          productVehicleListData={productVehicleListData}
        />
      )}
      {steps.rental.active && steps.initialPeriods.active && (
        <HelpMeChooseResult
          steps={steps}
          setSteps={setSteps}
          getProductVehicleList={getProductVehicleList}
          productVehicleListData={productVehicleListData}
        />
      )}
    </>
  );
};

export default withApollo(HelpMeChoose);
