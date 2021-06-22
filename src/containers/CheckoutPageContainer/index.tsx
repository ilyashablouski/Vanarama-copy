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
import { LeaseTypeEnum, VehicleTypeEnum } from '../../../generated/globalTypes';
import { sum } from '../../utils/array';

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
    label: 'Monthly Maintenance',
    isVisible: values.monthlyMaintenance,
    key: '4',
  },
  {
    label: 'Advanced Breakdown Cover',
    isVisible: values.advancedBreakdownCover,
    key: '5',
  },
];

const CheckoutPageContainer: React.FC<CheckoutPageContainerProps> = ({
  order,
  quote,
  derivative,
  vehicleImages,
  vehicleConfiguration,
}) => {
  const router = useRouter();
  const vehicleProduct = useMemo(() => order?.lineItems?.[0].vehicleProduct, [
    order,
  ]);
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
    () => order.leaseType.toUpperCase() === LeaseTypeEnum.PERSONAL,
    [order],
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
    [quote, values.monthlyMaintenance],
  );

  const onSubmit = useCallback(() => {
    const url = isPersonalPrice ? '/olaf/about' : '/b2b/olaf/about';
    return router.push(url, url).then(() => {});
  }, [isPersonalPrice]);

  return (
    <>
      <NextHead>
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
                order={order}
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
                <Text tag="p">
                  Details of the addresses you&lsquo;ve lived at for the past 3
                  years.
                </Text>
                <Text tag="p">
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
                <Price
                  price={price}
                  size="xlarge"
                  className="-mb-400"
                  priceDescription={`Per Month ${
                    isPersonalPrice ? 'inc.' : 'exc.'
                  } VAT`}
                />
                <List className="ticked orange" style={{ gap: 0 }}>
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
