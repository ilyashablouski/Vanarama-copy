import { NextPage } from 'next';
import React from 'react';
import Card from 'core/molecules/cards';
import Price from 'core/atoms/price';
import Text from 'core/atoms/text';
import Icon from 'core/atoms/icon';
import Checkmark from 'core/assets/icons/Checkmark';
import List from 'core/atoms/list';
import Heading from 'core/atoms/heading';
import Button from 'core/atoms/button/';

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
    label: '1 Year&lsquo;s Free Insurance',
    key: '2',
  },
  {
    label: 'Advanced Breakdown Cover',
    key: '3',
  },
];

const CheckoutPage: NextPage = () => {
  return (
    <div className="row:bg-lighter">
      <div>
        <Heading size="xlarge" color="black">
          Your Order
        </Heading>
        <div className="-flex">
          <div style={{ flexGrow: 1 }}>
            <Card withoutBoxShadow className="-mt-500">
              <Heading size="lead" color="black">
                Mercedes-Benz A Class Hatchback
              </Heading>
              <div className="-flex-row">
                <div>IMAGE</div>
                <div className="-ml-400">
                  <List>
                    <li className="-custom">
                      <Heading className="-mv-500" tag="span">
                        Initial Payment:
                      </Heading>
                      £1074.00 (Ex Vat)
                      <Text></Text>
                    </li>
                  </List>
                </div>
              </div>
            </Card>
            <Heading size="large" color="black" className="-mv-500">
              Additional Options
            </Heading>
            <Card withoutBoxShadow className="-mb-400">
              <Heading color="black" size="regular">
                Free Redundancy & Life Event Cover
              </Heading>
            </Card>
            <Card withoutBoxShadow className="-mb-400">
              <Heading color="black" size="regular">
                1 Year&lsquo;s Free Insurance
              </Heading>
            </Card>
            <Card withoutBoxShadow className="-mb-400">
              <Heading color="black" size="regular">
                Monthly Maintenance
              </Heading>
            </Card>
            <Card withoutBoxShadow className="-mb-400">
              <Heading color="black" size="regular">
                Advanced Breakdown Cover
              </Heading>
            </Card>
          </div>
          <div style={{ width: '408px', marginLeft: '28px' }}>
            <Card withoutBoxShadow className="-mt-500">
              <Heading size="lead" color="black">
                Total Monthly Cost
              </Heading>
              <Price
                price={186.49}
                size="xlarge"
                className="-mb-200"
                priceDescription="Per Month Inc. VAT"
              />
              <List className="-mb-200">
                {ADVANTAGES.map(item => (
                  <Heading
                    key={item.key}
                    tag="li"
                    size="lead"
                    color="black"
                    className="-custom"
                  >
                    <Icon size="lead" color="orange" icon={<Checkmark />} />
                    {item.label}
                  </Heading>
                ))}
              </List>
              <Button
                className="-mt-400"
                color="teal"
                dataTestId="about-you_continue-button"
                // disabled={formState.isSubmitting}
                fill="solid"
                iconColor="white"
                iconPosition="after"
                label="Checkout"
                size="large"
                type="submit"
              />
              <div>
                <Heading size="regular" color="black">
                  You Will Need:
                </Heading>
                <Text tag="p" className="-mt-100">
                  Details of the addresses you&lsquo;ve lived at for the past 3
                  years.
                </Text>
                <Text tag="p">
                  Details of the bank account that you&lsquo;ll use to pay
                  monthly payments.
                </Text>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
