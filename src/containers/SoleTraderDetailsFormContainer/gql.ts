import { gql, useQuery } from '@apollo/client';
import SoleTraderDetailsForm from '../../components/SoleTraderDetailsForm';
import { SoleTraderDetailsFormDataQuery } from '../../../generated/SoleTraderDetailsFormDataQuery';

export const GET_SOLETRADER_DETAILS_FORM_DATA = gql`
  query SoleTraderDetailsFormDataQuery {
    allDropDowns {
      ...SoleTraderDetailsDropDownData
    }
  }
  ${SoleTraderDetailsForm.fragments.dropDownData}
`;

// eslint-disable-next-line import/prefer-default-export
export const UPDATE_SOLETRADER_DETAILS = gql``;

export function useSoleTraderDetailsFormDataQuery() {
  return useQuery<SoleTraderDetailsFormDataQuery>(
    GET_SOLETRADER_DETAILS_FORM_DATA,
    {
      fetchPolicy: 'no-cache',
    },
  );
}
