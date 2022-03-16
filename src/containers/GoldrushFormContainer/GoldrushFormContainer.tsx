import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import * as toast from 'core/atoms/toast/Toast';
import router from 'next/router';
import { GoldrushFormContainerProps } from './interfaces';
import { useOpportunityCreation } from './gql';
import Skeleton from '../../components/Skeleton';
import ErrorMessages from '../../models/enum/ErrorMessages';
import { pushPageData } from '../../utils/dataLayerHelpers';
import { useSavePersonEmailMutation } from '../../gql/storedPersonEmail';
import { IGoldrushFromValues } from '../../components/GoldrushForm/interfaces';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Price = dynamic(() => import('core/atoms/price'), {
  loading: () => <Skeleton count={4} />,
  ssr: false,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Button = dynamic(() => import('core/atoms/button'), {
  loading: () => <Skeleton count={5} />,
});
const GoldrushForm = dynamic(() => import('../../components/GoldrushForm'), {
  loading: () => <Skeleton count={15} />,
  ssr: false,
});
const IconList = dynamic(() => import('core/organisms/icon-list'), {
  loading: () => <Skeleton count={3} />,
});
// @ts-ignore
const IconListItem = dynamic(() =>
  import('core/organisms/icon-list').then(mod => mod.IconListItem),
);
const Link = dynamic(() => import('core/atoms/link'));

export const DEFAULT_POSTCODE = 'HP27DE';

export const handleNetworkError = () =>
  toast.error(ErrorMessages.requestIssue, '');

const GoldrushFormContainer: React.FC<GoldrushFormContainerProps> = ({
  isPostcodeVisible,
  capId,
  opportunityType,
  vehicleType,
  isCallBackForm,
  termsAndConditions,
  onCompleted,
  dataUiTestId,
}) => {
  const [isGratitudeVisible, toggleGratitude] = useState(false);
  const [createOpportunity, { loading }] = useOpportunityCreation(
    () => toggleGratitude(true),
    error => {
      if (error?.networkError) {
        handleNetworkError();
      }
    },
  );
  const [savePersonEmailMutation] = useSavePersonEmailMutation();
  const savePersonDataInLocalStorage = (data: IGoldrushFromValues) => {
    savePersonEmailMutation({
      variables: {
        email: data.email,
      },
    });
  };
  async function pushAnalytics(values: IGoldrushFromValues) {
    await savePersonDataInLocalStorage(values);
    await pushPageData({ router });
  }

  const goldrushForm = () => (
    <GoldrushForm
      dataUiTestId={dataUiTestId}
      isCallBackForm={isCallBackForm}
      isSubmitting={loading}
      heading={
        isCallBackForm ? 'Please Fill In Your Details' : 'Get Your Quote Now'
      }
      text="We’ll be in touch within 1-2 business hours"
      isPostcodeVisible={isPostcodeVisible}
      onSubmit={values => {
        if (isCallBackForm) {
          pushAnalytics(values);
        }
        createOpportunity({
          variables: {
            email: values.email,
            phoneNumber: values.phoneNumber,
            fullName: values.fullName,
            postcode: values.postcode || DEFAULT_POSTCODE,
            capId,
            opportunityType,
            vehicleType,
            termsAndConditions:
              termsAndConditions || Boolean(values.termsAndCons),
            privacyPolicy: Boolean(values.privacyPolicy),
            communicationsConsent: Boolean(values.consent),
          },
        });
      }}
    />
  );

  if (isCallBackForm) {
    return (
      <div className="-pt-000">
        {isGratitudeVisible ? (
          <>
            <Heading size="regular" color="black">
              Thank you for submitting the form. We will be in touch shortly.
            </Heading>
            <Button
              className="-mt-600"
              dataTestId="goldrush-button_close"
              label="Close"
              size="lead"
              fill="solid"
              color="teal"
              onClick={onCompleted}
            />
          </>
        ) : (
          <div>{goldrushForm()}</div>
        )}
      </div>
    );
  }

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
            <Heading size="large" color="black">
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
          {goldrushForm()}
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
