import { gql, useQuery, useMutation } from '@apollo/client';
import SoleTraderDetailsForm from '../../components/SoleTraderDetailsForm';
import { SoleTraderDetailsFormDataQuery } from '../../../generated/SoleTraderDetailsFormDataQuery';

export const GET_SOLETRADER_DETAILS_FORM_DATA = gql`
  query SoleTraderDetailsFormDataQuery($uuid: ID!) {
    allDropDowns {
      ...SoleTraderDetailsDropDownData
    }
    personByUuid(uuid: $uuid) {
      uuid
      partyId
      addresses {
        ...SoleTraderDetailsFormAddresses
      }
    }
  }
  ${SoleTraderDetailsForm.fragments.addresses}
  ${SoleTraderDetailsForm.fragments.dropdownData}
`;

export const UPDATE_SOLETRADER_COMPANY = gql`
  mutation UpdateSoleTraderMutation($input: SoleTraderCompanyInputObject!) {
    updateCompanySoleTrader(input: $input) {
      ...SoleTraderPerson
    }
  }
  ${SoleTraderDetailsForm.fragments.soleTrader}
`;

export function useSoleTraderDetailsFormDataQuery(personUuid: string) {
  return useQuery<SoleTraderDetailsFormDataQuery>(
    GET_SOLETRADER_DETAILS_FORM_DATA,
    {
      fetchPolicy: 'no-cache',
      variables: {
        uuid: personUuid,
      },
    },
  );
}

export function useUpdateSoleTrader(personUuid: string) {
  return useMutation(UPDATE_SOLETRADER_COMPANY, {
    variables: {
      uuid: personUuid,
    },
  });
}
