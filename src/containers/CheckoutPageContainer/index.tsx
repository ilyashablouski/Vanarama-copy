import React, { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/router';
import decode from 'decode-html';
import NextHead from 'next/head';
import Text from 'core/atoms/text';
import List from 'core/atoms/list';
import Button from 'core/atoms/button';
import Heading from 'core/atoms/heading';
import Price from 'core/atoms/price';

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import css from '!!raw-loader!../../../public/styles/pages/checkout-page.css';
import OrderPanel from './OrderPanel';
import AdditionalOptionsForm from './AdditionalOptionsForm';
import {
  CheckoutPageContainerProps,
  IAdditionalOptionsFormValues,
} from './interfaces';
import {
  LeaseTypeEnum,
  VehicleProductInputObject,
  VehicleTypeEnum,
} from '../../../generated/globalTypes';
import { sum } from '../../utils/array';
import { GetQuoteDetails } from '../../../generated/GetQuoteDetails';
import { useSaveOrderMutation } from '../../gql/storedOrder';

const createIncludedOptions = (values: IAdditionalOptionsFormValues) => [
  {
    label: 'Free Delivery',
    isVisible: true,
    key: '0',
  },
  {
    label: 'Free Redundancy & Life Event Cover',
    isVisible: values.redundancy,
    key: '1',
  },
  {
    label: 'Free Loss Of Earnings & Life Event Cover',
    isVisible: values.lossOfEarnings,
    key: '2',
  },
  {
    label: "1 Year's Free Insurance",
    isVisible: values.freeInsurance,
    key: '3',
  },
  {
    label: 'Vanarama Service Plan',
    isVisible: values.monthlyMaintenance,
    key: '4',
  },
  {
    label: 'Advanced Breakdown Cover',
    isVisible: values.advancedBreakdownCover,
    key: '5',
  },
];

const createLineItem = (
  values: IAdditionalOptionsFormValues,
  quote: GetQuoteDetails['quoteByCapId'],
  vehicleProduct?: VehicleProductInputObject | null,
) =>
  ({
    ...vehicleProduct,
    maintenance: values.monthlyMaintenance || false,
    maintenancePrice: values.monthlyMaintenance
      ? quote?.maintenanceCost?.monthlyRental
      : null,
    freeInsurance: {
      optIn: values.freeInsurance || false,
      eligible: vehicleProduct?.freeInsurance?.eligible || false,
    },
  } as VehicleProductInputObject);

const CheckoutPageContainer: React.FC<CheckoutPageContainerProps> = ({
  storedOrder,
  quote,
  derivative,
  vehicleImages,
  vehicleConfiguration,
}) => {
  const router = useRouter();
  const vehicleProduct = useMemo(
    () => storedOrder?.order?.lineItems?.[0].vehicleProduct,
    [storedOrder?.order],
  );
  // enabled by default for cars only
  const redundancy = useMemo(
    () => vehicleProduct?.vehicleType === VehicleTypeEnum.CAR,
    [vehicleProduct],
  );
  // enabled by default for vans only
  const lossOfEarnings = useMemo(
    () =>
      vehicleProduct?.vehicleType === VehicleTypeEnum.LCV &&
      !derivative?.bodyType?.name?.toLowerCase().includes('pick-up'),
    [vehicleProduct, derivative],
  );
  const methods = useForm<IAdditionalOptionsFormValues>({
    defaultValues: {
      redundancy,
      lossOfEarnings,
      freeInsurance: vehicleProduct?.freeInsurance?.optIn || false,
      monthlyMaintenance: vehicleProduct?.maintenance || false,
      advancedBreakdownCover: false,
    },
    mode: 'onBlur',
  });

  const isPersonalPrice = useMemo(
    () =>
      storedOrder?.order?.leaseType.toUpperCase() === LeaseTypeEnum.PERSONAL,
    [storedOrder?.order],
  );
  const values = methods.watch();
  const includedItems = useMemo(
    () => createIncludedOptions(values).filter(item => item.isVisible),
    [values],
  );

  const price = useMemo(
    () =>
      sum(
        [
          vehicleProduct?.monthlyPayment,
          values.monthlyMaintenance ? quote?.maintenanceCost?.monthlyRental : 0,
        ],
        item => item || 0,
      ),
    [quote, values.monthlyMaintenance, vehicleProduct?.monthlyPayment],
  );

  const [saveOrderMutation] = useSaveOrderMutation();

  const onSubmit = useCallback(() => {
    const newOrder = {
      ...(storedOrder!.order || {}),
      leaseType: storedOrder?.order?.leaseType || LeaseTypeEnum.PERSONAL,
      lineItems: [
        {
          vehicleProduct: createLineItem(values, quote, vehicleProduct),
          ...(storedOrder!.order!.lineItems[0] || {}),
        },
      ],
    };

    saveOrderMutation({
      variables: {
        order: newOrder,
        rating: storedOrder?.rating,
      },
    })
      .then(() => (isPersonalPrice ? '/olaf/about' : '/b2b/olaf/about'))
      .then(url => router.push(url, url))
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isPersonalPrice,
    storedOrder?.order,
    storedOrder?.rating,
    quote,
    vehicleProduct,
    values,
  ]);

  return (
    <>
      <NextHead>
        {/* eslint-disable-next-line react/no-danger */}
        <style dangerouslySetInnerHTML={{ __html: decode(css) }} />
      </NextHead>
      <div className="row:bg-lighter">
        <div>
          <Heading className="-mb-500" size="xlarge" color="black" tag="h1">
            Your Order
          </Heading>
          <div className="side-bar-layout">
            <div>
              <OrderPanel
                order={storedOrder!.order}
                quote={quote}
                vehicleImage={vehicleImages?.[0]}
                vehicleConfiguration={vehicleConfiguration}
              />
              <Heading
                className="-mb-500 -checkout"
                size="large"
                color="black"
                tag="h2"
              >
                Additional Options
              </Heading>
              <AdditionalOptionsForm
                quote={quote}
                methods={methods}
                derivative={derivative}
                vehicleConfiguration={vehicleConfiguration}
              />
            </div>
            <div className="adjacent-panels-checkout-total">
              <div className="panel">
                <Text
                  color="black"
                  size="regular"
                  tag="p"
                  className="bold -mb-100"
                >
                  You Will Need:
                </Text>
                <Text className="-mb-400 -mt-000" tag="p">
                  Details of the addresses you&lsquo;ve lived at for the past 3
                  years.
                </Text>
                <Text className="-m-000" tag="p">
                  Details of the bank account that you&lsquo;ll use to pay
                  monthly payments.
                </Text>
              </div>
              <div className="panel checkout-total">
                <Heading
                  className="-checkout"
                  size="large"
                  color="black"
                  tag="h2"
                >
                  Total Monthly Cost
                </Heading>
                <Price price={price} size="xlarge" className="-mb-100" />
                <Text color="black" size="regular">
                  {`Per Month ${isPersonalPrice ? 'inc.' : 'exc.'} VAT`}
                </Text>
                <List className="ticked orange -mt-400" style={{ gap: 0 }}>
                  {includedItems.map(item => (
                    <li className="-custom" key={item.key}>
                      {item.label}
                    </li>
                  ))}
                </List>
                <Button
                  className="-mt-400 -fullwidth"
                  color="teal"
                  onClick={methods.handleSubmit(onSubmit)}
                  disabled={methods.formState.isSubmitting}
                  fill="solid"
                  iconColor="white"
                  iconPosition="after"
                  label="Checkout"
                  size="large"
                  type="submit"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPageContainer;
