import { useMutation, useQuery } from '@apollo/react-hooks';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { gql } from 'apollo-boost';
import moment from 'moment';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { AllDropDownsQuery } from '../../../../generated/AllDropDownsQuery';
import {
  CreateUpdatePersonMutation as Mutation,
  CreateUpdatePersonMutationVariables as MutationVariables,
} from '../../../../generated/CreateUpdatePersonMutation';
import AboutForm from '../../../components/AboutForm';
import OlafContainer from '../../../components/OlafContainer';
import withApollo from '../../../hocs/withApollo';

const CREATE_UPDATE_PERSON = gql`
  mutation CreateUpdatePersonMutation($input: PersonInputObject!) {
    createUpdatePerson(input: $input) {
      uuid
      partyId
    }
  }
`;

const ALL_DROPDOWNS = gql`
  query AllDropDownsQuery {
    allDropDowns {
      ...AboutFormDropdownData
    }
  }
  ${AboutForm.fragments.dropdownData}
`;

const AboutYouPage: NextPage = () => {
  const router = useRouter();
  const [createDetailsHandle] = useMutation<Mutation, MutationVariables>(
    CREATE_UPDATE_PERSON,
    {
      onCompleted: data => {
        router.push(
          `/olaf/address-history/[id]`,
          `/olaf/address-history/${data.createUpdatePerson!.uuid}`,
        );
      },
    },
  );

  const { data, loading, error } = useQuery<AllDropDownsQuery>(ALL_DROPDOWNS);
  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.allDropDowns) {
    return null;
  }

  return (
    <OlafContainer activeStep={1}>
      <AboutForm
        dropdownData={data.allDropDowns}
        submit={values => {
          const input = `${values.dayOfBirth} ${values.monthOfBirth} ${values.yearOfBirth}`;
          const dateOfBirth = moment(input, 'DD-MMMM-YYYY').format(
            'YYYY-MM-DD',
          );

          createDetailsHandle({
            variables: {
              input: {
                title: values.title,
                firstName: values.firstName,
                lastName: values.lastName,
                emailAddress: {
                  kind: 'Home',
                  value: values.email,
                  primary: true,
                },
                telephoneNumber: {
                  kind: 'Mobile',
                  value: values.mobile,
                  primary: true,
                },
                dateOfBirth,
                countryOfBirth: values.countryOfBirth,
                nationality: values.nationality,
                maritalStatus: values.maritalStatus,
                noOfDependants: Number(values.dependants),
                noOfAdultsInHousehold: Number(values.adultsInHousehold),
                emailConsent: values.consent,
                smsConsent: values.consent,
              },
            },
          });
        }}
      />
    </OlafContainer>
  );
};

export default withApollo(AboutYouPage, { getDataFromTree });
