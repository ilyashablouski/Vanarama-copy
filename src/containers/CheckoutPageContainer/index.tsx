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
import { LeaseTypeEnum,  } from '../../../generated/globalTypes';

const ADVANTAGES = [
  {
    label: 'Free Delivery',
    key: '0',
  },
  {
    label: 'Free Redundancy & Life Event Cover',
    key: '1',
  },
  {
    label: "1 Year's Free Insurance",
    key: '2',
  },
  {
    label: 'Advanced Breakdown Cover',
    key: '3',
  },
];

const CheckoutPageContainer: React.FC<CheckoutPageContainerProps> = ({
  order,
  derivative,
  vehicleImages,
  vehicleConfiguration,
}) => {
  const router = useRouter();
  const methods = useForm<IAdditionalOptionsFormValues>({
    // defaultValues,
    mode: 'onBlur',
  });
  const vehicleProduct = useMemo(() => order?.lineItems?.[0].vehicleProduct, [
    order,
  ]);
  const isPersonalPrice = useMemo(
    () => order.leaseType === LeaseTypeEnum.PERSONAL,
    [order],
  );

  const onSubmit = useCallback(() => {
    const url = isPersonalPrice ? '/olaf/about' : '/b2b/olaf/about';
    router.push(url, url);
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
                methods={methods}
                derivative={derivative}
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
                  price={vehicleProduct?.monthlyPayment}
                  size="xlarge"
                  className="-mb-400"
                  priceDescription={`Per Month ${
                    isPersonalPrice ? 'Inc' : 'Exc'
                  }. VAT`}
                />
                <List className="ticked orange">
                  {ADVANTAGES.map(item => (
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
