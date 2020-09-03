import React, { useMemo } from 'react';
import { useQuery, gql } from '@apollo/client';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import DirectorDetailsForm from '../../components/DirectorDetailsForm/DirectorDetailsForm';
import { DirectorDetailsFormValues, DirectorFormValues } from '../../components/DirectorDetailsForm/interfaces';
import {
  useCreateUpdateCreditApplication,
  useGetCreditApplicationByOrderUuid,
} from '../../gql/creditApplication';
import {
  useGetDirectorDetailsQuery,
  useSaveDirectorDetailsMutation,
} from './gql';
import { IDirectorDetailsFormContainerProps } from './interfaces';
import { mapFormValues, mapDirectorsDefaultValues, combineUpdatedDirectors } from './mappers';
import { formValuesToInputCreditApplication } from '../../mappers/mappersCreditApplication';
import {
  GetDirectorDetailsQuery,
  GetDirectorDetailsQueryVariables,
} from '../../../generated/GetDirectorDetailsQuery';
import { SaveDirectorDetailsMutation_createUpdateCompanyDirector_associates as Associate } from '../../../generated/SaveDirectorDetailsMutation';


export const GET_DIRECTOR_DETAILS = gql`
  query GetDirectorDetailsQuery($companyNumber: String!) {
    companyOfficers(companyNumber: $companyNumber) {
      nodes {
        name
      }
    }
  }
`;

function useCompanyOfficers(companyNumber?: string | null) {
  return useQuery<GetDirectorDetailsQuery, GetDirectorDetailsQueryVariables>(
    GET_DIRECTOR_DETAILS,
    {
      fetchPolicy: 'no-cache',
      variables: {
        companyNumber: companyNumber || '',
      },
      skip: !companyNumber,
    },
  );
}

export const DirectorDetailsFormContainer: React.FC<IDirectorDetailsFormContainerProps> = ({
  directorUuid,
  companyUuid,
  orderUuid,
  onCompleted,
  onError,
  isEdited,
}) => {
  const [saveDirectorDetails] = useSaveDirectorDetailsMutation();
  const [createUpdateApplication] = useCreateUpdateCreditApplication(
    orderUuid,
    () => {},
  );
  const getDirectorDetailsQuery = useGetDirectorDetailsQuery(companyUuid);
  const getCreditApplicationByOrderUuidQuery = useGetCreditApplicationByOrderUuid(
    orderUuid,
  );
  const companyOfficersQuery = useCompanyOfficers(
    getDirectorDetailsQuery.data?.companyByUuid?.companyNumber,
  );

  // const directorsDetails =
  //   getCreditApplicationByOrderUuidQuery.data?.creditApplicationByOrderUuid
  //     ?.directorsDetails;
  // const defaultValues = useMemo(() => {
  //   if (directorsDetails) {
  //     const defaultValues = mapDirectorsDefaultValues(directorsDetails);
  //     // const mappedDirectors =
  //   }

  //   return undefined;
  // }, [direc torsDetails]);

  const handleDirectorDetailsSave = (values: DirectorDetailsFormValues) =>
    saveDirectorDetails({
      variables: {
        input: mapFormValues(values, companyUuid),
      },
    });

  const handleCreditApplicationUpdate = (
    totalPercentage: number,
    direcotors?: DirectorFormValues[],
  ) =>
    createUpdateApplication({
      variables: {
        input: formValuesToInputCreditApplication({
          ...getCreditApplicationByOrderUuidQuery.data
            ?.creditApplicationByOrderUuid,
          directorsDetails: {
            direcotors,
            totalPercentage,
          },
          orderUuid,
        }),
      },
    });

  if (
    getDirectorDetailsQuery?.loading ||
    getCreditApplicationByOrderUuidQuery?.loading ||
    companyOfficersQuery?.loading
  ) {
    return <Loading size="xlarge" />;
  }

  if (getDirectorDetailsQuery?.error || companyOfficersQuery?.error) {
    const errorMessage = (
      getDirectorDetailsQuery?.error || companyOfficersQuery?.error
    )?.message;
    return <p>Error: {errorMessage}</p>;
  }

  return (
    <DirectorDetailsForm
      officers={companyOfficersQuery.data?.companyOfficers.nodes}
      isEdited={isEdited}
      directorUuid={directorUuid}
      associates={getDirectorDetailsQuery.data?.companyByUuid?.associates!}
      // defaultValues={defaultValues}
      dropdownData={getDirectorDetailsQuery.data?.allDropDowns!}
      companyNumber={
        getDirectorDetailsQuery.data?.companyByUuid?.companyNumber!
      }
      onSubmit={async values => {
        await handleDirectorDetailsSave(values)
          .then(query =>
            combineUpdatedDirectors(
              values.directors,
              query.data?.createUpdateCompanyDirector?.associates,
            ),
          )
          .then(combinedDirectors =>
            handleCreditApplicationUpdate(
              values.totalPercentage,
              combinedDirectors,
            ),
          )
          // .then(onCompleted)
          .catch(onError);
      }}
    />
  );
};

export default DirectorDetailsFormContainer;
