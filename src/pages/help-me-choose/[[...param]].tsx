import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import withApollo from '../../hocs/withApollo';
import { PRODUCTS_FILTER_LIST } from '../../gql/help-me-choose';
import {
  ProductFilterListInputObject,
  VehicleTypeEnum,
} from '../../../generated/globalTypes';
import { ProductsFilterListVariables } from '../../../generated/ProductsFilterList';
import HelpMeChooseContainer from '../../containers/HelpMeChooseContainer';
import {
  buildAnObjectFromAQuery,
  getBuckets,
  IStep,
  onReplace,
} from '../../containers/HelpMeChooseContainer/helpers';
import { getSectionsData } from '../../utils/getSectionsData';

export interface IInitStep {
  leaseType: IStep;
  bodyStyles: IStep;
  fuelTypes: IStep;
  transmissions: IStep;
}

const initialSteps: IInitStep = {
  leaseType: {
    active: true,
    value: 'Personal' as any,
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
};

const HelpMeChoose: NextPage = () => {
  const router = useRouter();
  const [steps, setSteps] = useState<IInitStep>(initialSteps);
  const [leaseTypeValue, setLeaseTypeValue] = useState<string>(
    steps.leaseType.value as any,
  );
  const [bodyStylesValue, setBodyStylesValue] = useState<string[]>(
    steps.bodyStyles.value as string[],
  );
  const [fuelTypesValue, setFuelTypesValue] = useState<string[]>(
    steps.fuelTypes.value as string[],
  );
  const [transmissionsValue, setTransmissionsValue] = useState<string[]>(
    steps.transmissions.value as string[],
  );

  const [getProductsFilterList, ProductsFilterListData] = useLazyQuery<
    ProductFilterListInputObject,
    ProductsFilterListVariables
  >(PRODUCTS_FILTER_LIST);

  const leaseTypes = [
    { label: 'Personal', active: leaseTypeValue === 'Personal' },
    { label: 'Business', active: leaseTypeValue === 'Business' },
  ];
  const bodyStyleData = getSectionsData(
    ['productsFilterList', 'bodyStyles', 'buckets'],
    ProductsFilterListData?.data,
  );
  const fuelTypesData = getSectionsData(
    ['productsFilterList', 'fuelTypes', 'buckets'],
    ProductsFilterListData?.data,
  );
  const transmissionsData = getSectionsData(
    ['productsFilterList', 'transmissions', 'buckets'],
    ProductsFilterListData?.data,
  );

  useEffect(() => {
    if (window?.location.search.length) {
      const searchParams = new URLSearchParams(window.location.search);
      const leaseTypeQueryValue = searchParams.get('leaseType');
      const bodyStylesQuery = searchParams.getAll('bodyStyles');
      const fuelTypesQuery = searchParams.getAll('fuelTypes');
      const transmissionsQuery = searchParams.getAll('transmissions');
      const bodyStylesQueryValue = bodyStylesQuery.length
        ? bodyStylesQuery[0].split(',')
        : [];
      const fuelTypesQueryValue = fuelTypesQuery.length
        ? fuelTypesQuery[0].split(',')
        : [];
      const transmissionsQueryValue = transmissionsQuery.length
        ? transmissionsQuery[0].split(',')
        : [];
      const isLeaseTypeActive =
        searchParams.has('leaseType') && !searchParams.has('bodyStyles');
      const isBodyStylesActive =
        searchParams.has('bodyStyles') && !searchParams.has('fuelTypes');
      const isFuelTypesActive =
        searchParams.has('fuelTypes') && !searchParams.has('transmissions');
      const isTransmissionsActive = searchParams.has('transmissions');
      setSteps({
        leaseType: {
          active: isLeaseTypeActive,
          value: leaseTypeQueryValue as any,
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
      });
      setLeaseTypeValue(leaseTypeQueryValue as string);
      setBodyStylesValue(bodyStylesQueryValue);
      setFuelTypesValue(fuelTypesQueryValue);
      setTransmissionsValue(transmissionsQueryValue);
      const variables = {
        filter: {
          ...buildAnObjectFromAQuery(searchParams),
          vehicleTypes: [VehicleTypeEnum.CAR],
        },
      };
      getProductsFilterList({
        variables,
      });
    }
  }, [getProductsFilterList]);

  return (
    <>
      {steps.leaseType.active && (
        <HelpMeChooseContainer
          title="Are you looking for a lease for you personally or for your business?"
          choicesValues={leaseTypes}
          setChoice={setLeaseTypeValue}
          onClickContinue={() => {
            getProductsFilterList({
              variables: {
                filter: {
                  vehicleTypes: [VehicleTypeEnum.CAR],
                },
              },
            });
            setSteps({
              ...steps,
              leaseType: { active: false, value: leaseTypeValue as any },
              bodyStyles: { active: true, value: steps.bodyStyles.value },
            });
            onReplace(router, {
              ...steps,
              leaseType: { active: false, value: leaseTypeValue as any },
            });
          }}
          currentValue={leaseTypeValue}
        />
      )}
      {steps.bodyStyles.active && bodyStyleData?.length && (
        <HelpMeChooseContainer
          title="What Type Of Vehicle Suits You Best?"
          choicesValues={getBuckets(bodyStyleData, bodyStylesValue)}
          setChoice={setBodyStylesValue}
          onClickContinue={() => {
            getProductsFilterList({
              variables: {
                filter: {
                  vehicleTypes: [VehicleTypeEnum.CAR],
                  bodyStyles: bodyStylesValue,
                },
              },
            });
            setSteps({
              ...steps,
              bodyStyles: { active: false, value: bodyStylesValue },
              fuelTypes: { active: true, value: steps.fuelTypes.value },
            });
            onReplace(router, {
              ...steps,
              bodyStyles: { active: false, value: bodyStylesValue },
            });
          }}
          multiSelect
          currentValue={bodyStylesValue}
          clearMultiSelectTitle="I Don't Mind"
        />
      )}
      {steps.fuelTypes.active && fuelTypesData?.length && (
        <HelpMeChooseContainer
          title="Which Fuel Type Do You Prefer?"
          choicesValues={getBuckets(fuelTypesData, fuelTypesValue)}
          setChoice={setFuelTypesValue}
          onClickContinue={() => {
            getProductsFilterList({
              variables: {
                filter: {
                  vehicleTypes: [VehicleTypeEnum.CAR],
                  bodyStyles: steps.bodyStyles.value,
                  fuelTypes: fuelTypesValue,
                },
              },
            });
            setSteps({
              ...steps,
              fuelTypes: { active: false, value: fuelTypesValue },
              transmissions: { active: true, value: steps.transmissions.value },
            });
            onReplace(router, {
              ...steps,
              fuelTypes: { active: false, value: fuelTypesValue },
            });
          }}
          multiSelect
          currentValue={fuelTypesValue}
          clearMultiSelectTitle="I Don't Mind"
        />
      )}
      {steps.transmissions.active && transmissionsData?.length && (
        <HelpMeChooseContainer
          title="Which Fuel Type Do You Prefer?"
          choicesValues={getBuckets(transmissionsData, transmissionsValue)}
          setChoice={setTransmissionsValue}
          onClickContinue={() => {
            getProductsFilterList({
              variables: {
                filter: {
                  vehicleTypes: [VehicleTypeEnum.CAR],
                  bodyStyles: steps.bodyStyles.value,
                  fuelTypes: steps.fuelTypes.value,
                  transmissions: transmissionsValue,
                },
              },
            });
            setSteps({
              ...steps,
              transmissions: { active: true, value: transmissionsValue },
            });
            onReplace(router, {
              ...steps,
              transmissions: { active: true, value: transmissionsValue },
            });
          }}
          multiSelect
          currentValue={transmissionsValue}
          clearMultiSelectTitle="I Don't Mind"
        />
      )}
    </>
  );
};

export default withApollo(HelpMeChoose);
