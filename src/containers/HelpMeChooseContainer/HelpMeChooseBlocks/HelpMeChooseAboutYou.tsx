import React, { FC, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import withApollo from '../../../hocs/withApollo';
import { PRODUCTS_FILTER_LIST } from '../../../gql/help-me-choose';
import {
  ProductFilterListInputObject,
  VehicleTypeEnum,
} from '../../../../generated/globalTypes';
import { ProductsFilterListVariables } from '../../../../generated/ProductsFilterList';
import HelpMeChooseContainer from '../HelpMeChooseContainer';

const HelpMeChooseAboutYou: FC = () => {
  const [leaseType, setLeaseType] = useState<string>('Personal');
  const leaseTypes = [
    { label: 'Personal', active: leaseType === 'Personal' },
    { label: 'Business', active: leaseType === 'Business' },
  ];

  const [getProductsFilterList] = useLazyQuery<
    ProductFilterListInputObject,
    ProductsFilterListVariables
  >(PRODUCTS_FILTER_LIST);

  return (
    <HelpMeChooseContainer
      title="Are you looking for a lease for you personally or for your business?"
      choicesValues={leaseTypes}
      setChoice={setLeaseType}
      onClickContinue={() => {
        getProductsFilterList({
          variables: {
            filter: {
              vehicleTypes: [VehicleTypeEnum.CAR],
            },
          },
        });
      }}
      currentValue={leaseType}
    />
  );
};

export default withApollo(HelpMeChooseAboutYou);
