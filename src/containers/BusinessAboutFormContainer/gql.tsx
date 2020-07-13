import { gql, useMutation, useQuery, ApolloError } from '@apollo/client';
import { GetB2BAboutPageData } from '../../../generated/GetB2BAboutPageData';
import {
  SaveBusinessAboutYou,
  SaveBusinessAboutYouVariables,
} from '../../../generated/SaveBusinessAboutYou';
import BusinessAboutForm from '../../components/BusinessAboutForm/BusinessAboutForm';

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

export function useAboutPageDataQuery() {
  return useQuery<GetB2BAboutPageData>(GET_B2B_ABOUT_PAGE_DATA);
}

export function useSaveAboutYouMutation(
  onCompleted?: (data: SaveBusinessAboutYou) => void,
  onError?: (error: ApolloError) => void,
) {
  return useMutation<SaveBusinessAboutYou, SaveBusinessAboutYouVariables>(
    SAVE_BUSINESS_ABOUT_YOU,
    { onCompleted, onError },
  );
}
