import { useMutation, useQuery } from '@apollo/react-hooks';
import { getDataFromTree } from '@apollo/react-ssr';
import { gql } from 'apollo-boost';
import moment from 'moment';
import { NextPage } from 'next';
import { AllDropdownsQuery } from '../../../../generated/AllDropdownsQuery';
import {
  CreateUpdatePersonMutation as Mutation,
  CreateUpdatePersonMutationVariables as MutationVariables,
} from '../../../../generated/CreateUpdatePersonMutation';
import AboutForm from '../../../components/olaf/about-form';
import OlafContainer from '../../../components/olaf/olaf-container';
import withApollo from '../../../hocs/withApollo';

const CREATE_UPDATE_PERSON = gql`
  mutation CreateUpdatePersonMutation($input: PersonInputObject!) {
    createUpdatePerson(input: $input) {
      id
    }
  }
`;

const ALL_DROPDOWNS = gql`
  query AllDropdownsQuery {
    allDropDowns {
      ...AboutFormDropdownData
    }
  }
  ${AboutForm.fragments.dropdownData}
`;

const AboutYouPage: NextPage = () => {
  const [createDetailsHandle] = useMutation<Mutation, MutationVariables>(
    CREATE_UPDATE_PERSON,
  );

  const { data, loading, error } = useQuery<AllDropdownsQuery>(ALL_DROPDOWNS);
  if (loading || error) {
    // TODO: Handle loading and error states
    return null;
  }

  return (
    <OlafContainer activeStep={1}>
      <AboutForm
        dropdownData={data.allDropDowns}
        submit={values => {
          const input = `${values.dayOfBirth} ${values.monthOfBirth} ${values.yearOfBirth}`;
          const dateOfBirth = moment(input, 'DD-MMMM-YYYY').format('DD-MM-YY');

          createDetailsHandle({
            variables: {
              input: {
                title: values.title,
                maritalStatus: values.maritalStatus,
                firstName: values.firstName,
                lastName: values.lastName,
                emailConsent: values.consent,
                smsConsent: values.consent,
                dateOfBirth,
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
              },
            },
          });
        }}
      />
    </OlafContainer>
  );
};

export default withApollo(AboutYouPage, { getDataFromTree });
