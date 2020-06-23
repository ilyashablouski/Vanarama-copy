import { gql, useMutation, useQuery } from '@apollo/client';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import * as toast from '@vanarama/uibook/lib/components/atoms/toast/Toast';
import { GetB2BAboutPageData } from '../../../../../generated/GetB2BAboutPageData';
import {
  SaveBusinessAboutYou,
  SaveBusinessAboutYouVariables,
} from '../../../../../generated/SaveBusinessAboutYou';
import BusinessAboutForm from '../../../../components/BusinessAboutForm/BusinessAboutForm';
import withApollo from '../../../../hocs/withApollo';
import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';
import { getUrlParam, OLAFQueryParams } from '../../../../utils/url';

export const GET_B2B_ABOUT_PAGE_DATA = gql`
  query GetB2BAboutPageData {
    allDropDowns {
      ...BusinessAboutFormDropDownData
    }
  }
  ${BusinessAboutForm.fragments.dropDownData}
`;

export const SAVE_BUSINESS_ABOUT_YOU = gql`
  mutation SaveBusinessAboutYou($input: PersonInputObject!) {
    createUpdateBusinessPerson(input: $input) {
      uuid
      companies {
        uuid
      }
    }
  }
`;

export const BusinessAboutPage: NextPage = () => {
  const router = useRouter();
  const { derivativeId, orderId } = router.query as OLAFQueryParams;

  const { data, loading, error } = useQuery<GetB2BAboutPageData>(
    GET_B2B_ABOUT_PAGE_DATA,
  );

  const [saveDetails] = useMutation<
    SaveBusinessAboutYou,
    SaveBusinessAboutYouVariables
  >(SAVE_BUSINESS_ABOUT_YOU, {
    onCompleted: ({ createUpdateBusinessPerson }) => {
      const companyUuid = createUpdateBusinessPerson!.companies?.[0].uuid!;
      const params = getUrlParam({ derivativeId, orderId });
      const url = `/b2b/olaf/company-details/[companyUuid]${params}`;
      router.push(url, url.replace('[companyUuid]', companyUuid));
    },
    onError: () => {
      toast.error(
        'Oops, an unexpected error occurred',
        'Your details could not be saved. Please try submitting the form again.',
        { dataTestId: 'about-you-error' },
      );
    },
  });

  return (
    <OLAFLayout>
      {error && (
        <Text tag="p" color="danger" size="lead">
          Sorry, an unexpected error occurred. Please try again!
        </Text>
      )}
      {loading && <Loading size="large" />}
      {data && data.allDropDowns && (
        <BusinessAboutForm
          dropDownData={data.allDropDowns}
          onSubmit={async values => {
            await saveDetails({
              variables: {
                input: {
                  title: values.title,
                  firstName: values.firstName,
                  lastName: values.lastName,
                  telephoneNumbers: [
                    {
                      value: values.telephone,
                    },
                  ],
                  emailAddress: {
                    value: values.email,
                  },
                  company: {
                    companyType: values.companyType,
                  },
                  profilingConsent: values.consent,
                  emailConsent: values.marketing,
                  smsConsent: values.marketing,
                  termsAndConditions: values.termsAndConditions,
                  role: {
                    position: 'Account owner',
                    primaryContact: true,
                  },
                },
              },
            });
          }}
        />
      )}
    </OLAFLayout>
  );
};

export default withApollo(BusinessAboutPage, { getDataFromTree });
