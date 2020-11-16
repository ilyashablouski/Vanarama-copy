import React, { FC, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import withApollo from '../../../hocs/withApollo';
import { PRODUCTS_FILTER_LIST } from '../../../gql/help-me-choose';
import {
  ProductFilterListInputObject,
  VehicleTypeEnum,
} from '../../../../generated/globalTypes';
import { ProductsFilterListVariables } from '../../../../generated/ProductsFilterList';
import { getSectionsData } from '../../../utils/getSectionsData';
import { getBuckets } from '../helpers';
import HelpMeChooseContainer from '../HelpMeChooseContainer';

const HelpMeChooseStyle: FC = () => {
  const [getProductsFilterList, ProductsFilterListData] = useLazyQuery<
    ProductFilterListInputObject,
    ProductsFilterListVariables
  >(PRODUCTS_FILTER_LIST);

  useEffect(() => {
    getProductsFilterList({
      variables: {
        filter: {
          vehicleTypes: [VehicleTypeEnum.CAR],
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [bodyStyles, setBodyStyles] = useState<string[]>([]);
  const bodyStyleData = getSectionsData(
    ['productsFilterList', 'bodyStyles', 'buckets'],
    ProductsFilterListData?.data,
  );

  return (
    <HelpMeChooseContainer
      title="What Type Of Vehicle Suits You Best?"
      choicesValues={
        bodyStyleData?.length
          ? getBuckets(
              [
                ...bodyStyleData,
                {
                  key: "I Don't Mind",
                },
              ],
              bodyStyles,
            )
          : []
      }
      setChoice={setBodyStyles}
      onClickContinue={() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        bodyStyles.length
          ? getProductsFilterList({
              variables: {
                filter: {
                  vehicleTypes: [VehicleTypeEnum.CAR],
                  bodyStyles,
                },
              },
            })
          : getProductsFilterList({
              variables: {
                filter: {
                  vehicleTypes: [VehicleTypeEnum.CAR],
                },
              },
            });
      }}
      multiSelect
      currentValue={bodyStyles}
    />
  );
};

export default withApollo(HelpMeChooseStyle);
