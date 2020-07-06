import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Price from '@vanarama/uibook/lib/components/atoms/price';
import Link from '@vanarama/uibook/lib/components/atoms/link';
import IconList, {
  IconListItem,
} from '@vanarama/uibook/lib/components/organisms/icon-list';
import * as toast from '@vanarama/uibook/lib/components/atoms/toast/Toast';
import GoldrushForm from '../../components/GoldrushForm';
import {
  CreateOpportunity as Mutation,
  CreateOpportunityVariables as MutationVariables,
} from '../../../generated/CreateOpportunity';
import { GoldrushFormContainerProps } from './interfaces';

const DEFAULT_POSTCODE = 'HP27DE';

const handleNetworkError = () =>
  toast.error(
    'Sorry there seems to be an issue with your request. Pleaser try again in a few moments',
    'Dolor ut tempor eiusmod enim consequat laboris dolore ut pariatur labore sunt incididunt dolore veniam mollit excepteur dolor aliqua minim nostrud adipisicing culpa aliquip ex',
  );

export const CREATE_OPPORTUNITY_MUTATION = gql`
  mutation CreateOpportunity(
    $capId: Int
    $email: String!
    $fullName: String!
    $marketingPreference: Boolean
    $kind: String!
    $phoneNumber: String!
    $postcode: String!
    $termsAndConditions: Boolean
    $vehicleType: String
  ) {
    createOpportunity(
      input: {
        capId: $capId
        communicationsConsent: $marketingPreference
        email: $email
        fullName: $fullName
        kind: $kind
        phoneNumber: $phoneNumber
        postcode: $postcode
        termsAndConditions: $termsAndConditions
        vehicleType: $vehicleType
      }
    ) {
      uuid
    }
  }
`;

const GoldrushFormContainer: React.FC<GoldrushFormContainerProps> = ({
  isPostcodeVisible,
  capId,
  kind,
  termsAndConditions,
  vehicleType,
}) => {
  const [isGratitudeVisible, toggleGratitude] = useState(false);
  const [createOppurtunity, { loading }] = useMutation<
    Mutation,
    MutationVariables
  >(CREATE_OPPORTUNITY_MUTATION, {
    onCompleted: () => toggleGratitude(true),
    onError: error => {
      if (error?.networkError) {
        handleNetworkError();
      }
    },
  });

  return (
    <div className="pdp--sidebar">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Heading tag="span" size="small" color="black">
            FACTORY ORDER
          </Heading>
          <Text size="small" color="darker">
            Availability: 12 Weeks (Avg)
          </Text>
        </div>
        <div>
          <Price size="xlarge" />
        </div>
      </div>
      {isGratitudeVisible ? (
        <div>
          <Heading size="large" color="black">
            Thanks, We’ll Be In Touch
          </Heading>
          <Text size="regular" color="darker">
            One of our vehicle experts will give you a call shortly to talk
            through your options.
          </Text>
          <div className="-mb-500 -mt-500">
            <Heading size="large" color="lead">
              Why Vanarama?
            </Heading>
            <IconList>
              <IconListItem iconColor="orange">
                The best deal guaranteed by our Price Promise
              </IconListItem>
              <IconListItem iconColor="orange">
                Redundancy &amp; life event cover included
              </IconListItem>
              <IconListItem iconColor="orange">
                Free, safe &amp; contactless delivery
              </IconListItem>
            </IconList>
          </div>
          <Text size="regular" color="darker">
            We look forward to having a chat.
          </Text>
        </div>
      ) : (
        <>
          <GoldrushForm
            isSubmitting={loading}
            heading="Get Your Quote Now"
            isPostcodeVisible={isPostcodeVisible}
            onSubmit={values => {
              createOppurtunity({
                variables: {
                  email: values.email,
                  phoneNumber: values.phoneNumber,
                  fullName: values.fullName,
                  postcode: values.postcode || DEFAULT_POSTCODE,
                  marketingPreference: Boolean(values.marketingPreference),
                  capId,
                  kind,
                  vehicleType,
                  termsAndConditions,
                },
              });
            }}
          />
          <div className="pdp--sidebar-promise">
            <Text size="regular" color="black" tag="span">
              {"We’ll beat any lease quote or we'll give you £100. "}
            </Text>
            <Link href="#" color="success" size="small">
              Terms and Conditions apply.
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default GoldrushFormContainer;
