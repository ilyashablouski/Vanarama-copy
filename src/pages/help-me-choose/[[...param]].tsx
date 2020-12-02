import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import withApollo from '../../hocs/withApollo';
import { PRODUCTS_FILTER_LIST } from '../../gql/help-me-choose';
import {
  ProductFilterListInputObject,
  VehicleTypeEnum,
} from '../../../generated/globalTypes';
import { ProductsFilterListVariables } from '../../../generated/ProductsFilterList';
import {
  buildAnObjectFromAQuery,
  IInitStep,
} from '../../containers/HelpMeChooseContainer/helpers';
import { getSectionsData } from '../../utils/getSectionsData';
import HelpMeChooseAboutYou from '../../containers/HelpMeChooseContainer/HelpMeChooseBlocks/HelpMeChooseAboutYou';
import HelpMeChooseBodyStyle from '../../containers/HelpMeChooseContainer/HelpMeChooseBlocks/HelpMeChooseBodyStyle';
import HelpMeChooseFuelTypes from '../../containers/HelpMeChooseContainer/HelpMeChooseBlocks/HelpMeChooseFuelTypes';
import HelpMeChooseTransmissions from '../../containers/HelpMeChooseContainer/HelpMeChooseBlocks/HelpMeChooseTransmissions';
import HelpMeChooseLeaseLength from '../../containers/HelpMeChooseContainer/HelpMeChooseBlocks/HelpMeChooseLeaseLength';

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
  leaseLength: {
    active: false,
    value: '' as any,
  },
};

const HelpMeChoose: NextPage = () => {
  const [steps, setSteps] = useState<IInitStep>(initialSteps);

  const [getProductsFilterList, productsFilterListData] = useLazyQuery<
    ProductFilterListInputObject,
    ProductsFilterListVariables
  >(PRODUCTS_FILTER_LIST);

  const bodyStyleData = getSectionsData(
    ['productsFilterList', 'bodyStyles', 'buckets'],
    productsFilterListData?.data,
  );
  const fuelTypesData = getSectionsData(
    ['productsFilterList', 'fuelTypes', 'buckets'],
    productsFilterListData?.data,
  );
  const transmissionsData = getSectionsData(
    ['productsFilterList', 'transmissions', 'buckets'],
    productsFilterListData?.data,
  );

  useEffect(() => {
    if (window?.location.search.length) {
      const searchParams = new URLSearchParams(window.location.search);
      const financeTypesQueryValue = searchParams.get('financeTypes');
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
      const isFinanceTypesActive =
        searchParams.has('financeTypes') && !searchParams.has('bodyStyles');
      const isBodyStylesActive =
        searchParams.has('bodyStyles') && !searchParams.has('fuelTypes');
      const isFuelTypesActive =
        searchParams.has('fuelTypes') && !searchParams.has('transmissions');
      const isTransmissionsActive =
        searchParams.has('transmissions') && !searchParams.has('leaseLength');
      const isLeaseLengthActive = searchParams.has('leaseLength');
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
        leaseLength: {
          active: isLeaseLengthActive,
          value: '' as any,
        },
      });
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

  if (productsFilterListData.loading) {
    return <Loading size="large" />;
  }

  return (
    <>
      {steps.financeTypes.active && (
        <HelpMeChooseAboutYou
          steps={steps}
          setSteps={setSteps}
          getProductsFilterList={getProductsFilterList}
          productsFilterListData={productsFilterListData}
        />
      )}
      {steps.bodyStyles.active && bodyStyleData?.length && (
        <HelpMeChooseBodyStyle
          steps={steps}
          setSteps={setSteps}
          getProductsFilterList={getProductsFilterList}
          productsFilterListData={productsFilterListData}
        />
      )}
      {steps.fuelTypes.active && fuelTypesData?.length && (
        <HelpMeChooseFuelTypes
          steps={steps}
          setSteps={setSteps}
          getProductsFilterList={getProductsFilterList}
          productsFilterListData={productsFilterListData}
        />
      )}
      {steps.transmissions.active && transmissionsData?.length && (
        <HelpMeChooseTransmissions
          steps={steps}
          setSteps={setSteps}
          getProductsFilterList={getProductsFilterList}
          productsFilterListData={productsFilterListData}
        />
      )}
      {steps.leaseLength.active && (
        <HelpMeChooseLeaseLength
          steps={steps}
          setSteps={setSteps}
          getProductsFilterList={getProductsFilterList}
          productsFilterListData={productsFilterListData}
        />
      )}
    </>
  );
};

export default withApollo(HelpMeChoose);
