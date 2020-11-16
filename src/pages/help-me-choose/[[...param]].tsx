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
import { getBuckets } from '../../containers/HelpMeChooseContainer/helpers';
import { getSectionsData } from '../../utils/getSectionsData';

interface IStep {
  active: boolean;
  value: string[];
}

const initialSteps = {
  leaseType: {
    active: true,
    value: 'Personal' as any,
  } as IStep,
  bodyStyles: {
    active: false,
    value: [],
  } as IStep,
  fuelTypes: {
    active: false,
    value: [],
  } as IStep,
  transmissions: {
    active: false,
    value: [],
  } as IStep,
};

const HelpMeChoose: NextPage = () => {
  const router = useRouter();
  const [steps, setSteps] = useState(initialSteps);
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

  const onReplace = (newStep: {
    leaseType: IStep;
    bodyStyles: IStep;
    fuelTypes: IStep;
    transmissions: IStep;
  }) => {
    let pathname = router.route.replace('[[...param]]', '');
    const queryString = new URLSearchParams();
    // don't add range and make to query for make/range pages
    const queries = {} as any;
    Object.entries(newStep).forEach(filter => {
      const [key, step] = filter;
      if (step.value?.length) {
        queries[key] = step.value;
      }
    });
    Object.entries(queries).forEach(([key, value]) =>
      queryString.set(key, value as string),
    );
    if (Object.keys(queries).length)
      pathname += `?${decodeURIComponent(queryString.toString())}`;
    // changing url dynamically
    router.replace(
      {
        pathname: router.route,
        query: queries,
      },
      pathname,
      { shallow: true },
    );
  };

  // useEffect(() => {
  //   if (router.query) {

  //   }
  // }, []);

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
            onReplace({
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
            onReplace({
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
            onReplace({
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
            onReplace({
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
