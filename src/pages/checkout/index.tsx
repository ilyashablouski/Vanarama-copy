import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';
import Card from 'core/molecules/cards';
import Price from 'core/atoms/price';
import Text from 'core/atoms/text';
import Skeleton from '../../components/Skeleton';
import AdditionalOption from '../../components/AdditionalOption';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});

const CheckoutPage: NextPage = () => {
  return (
    <div className="row:bg-lighter">
      <div>
        <Heading size="xlarge" color="black">
          Your Order
        </Heading>
        <div className="-flex">
          <div className="full-width">
            <Card withoutBoxShadow className="-mt-500">
              <Heading size="lead" color="black">
                Mercedes-Benz A Class Hatchback
              </Heading>
              <div>additional info</div>
            </Card>
            <Heading size="large" color="black">
              Additional Options
            </Heading>
            <AdditionalOption
              heading="Free Redundancy & Life Event Cover"
              className="-mt-500"
            />
            <AdditionalOption
              heading="1 Year&lsquo;s Free Insurance"
              className="-mt-500"
            />
            <AdditionalOption
              heading="Monthly Maintenance"
              className="-mt-500"
            />
            <AdditionalOption heading="Advanced Breakdown Cover" />
          </div>
          <div style={{ width: '408px', marginLeft: '28px' }}>
            <Card withoutBoxShadow className="-mt-500">
              <Heading size="lead" color="black">
                Total Monthly Cost
              </Heading>
              <Price
                price={186.49}
                size="xlarge"
                priceDescription="Per Month Inc. VAT"
              />
              <Text color="black" tag="p">
                You Will Need:
              </Text>
              <Text tag="p">
                Details of the addresses you&lsquo;ve lived at for the past 3
                years.
              </Text>
              <Text tag="p">
                Details of the bank account that you&lsquo;ll use to pay monthly
                payments.
              </Text>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// export async function getStaticProps(context: GetStaticPropsContext) {
//   try {
//     const client = createApolloClient({}, context as NextPageContext);
//     const paths = context?.params?.pages as string[];
//
//     const { data, errors } = await client.query({
//       query: GENERIC_PAGE,
//       variables: {
//         slug: `competitions/${paths?.join('/')}`,
//       },
//     });
//     if (errors) {
//       throw new Error(errors[0].message);
//     }
//     return {
//       revalidate: Number(process.env.REVALIDATE_INTERVAL),
//       props: {
//         data,
//       },
//     };
//   } catch (err) {
//     throw new Error(err);
//   }
// }

export default CheckoutPage;
