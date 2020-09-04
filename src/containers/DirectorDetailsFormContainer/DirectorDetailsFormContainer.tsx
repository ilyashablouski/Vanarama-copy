import React, { useMemo } from 'react';
import { useQuery, gql } from '@apollo/client';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import DirectorDetailsForm from '../../components/DirectorDetailsForm/DirectorDetailsForm';
import {
  DirectorDetailsFormValues,
  DirectorFormValues,
} from '../../components/DirectorDetailsForm/interfaces';
import {
  useCreateUpdateCreditApplication,
  useGetCreditApplicationByOrderUuid,
} from '../../gql/creditApplication';
import {
  useGetDirectorDetailsQuery,
  useSaveDirectorDetailsMutation,
} from './gql';
import { IDirectorDetailsFormContainerProps } from './interfaces';
import {
  mapFormValues,
  mapDirectorsDefaultValues,
  combineUpdatedDirectors,
} from './mappers';
import { formValuesToInputCreditApplication } from '../../mappers/mappersCreditApplication';
import {
  GetDirectorDetailsQuery,
  GetDirectorDetailsQueryVariables,
} from '../../../generated/GetDirectorDetailsQuery';
import { parseOfficers } from '../../components/DirectorDetailsForm/helpers';
import { isTruthy } from '../../utils/array';

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
  const allDropDowns = getDirectorDetailsQuery.data?.allDropDowns;
  const companyNumber =
    getDirectorDetailsQuery.data?.companyByUuid?.companyNumber;
  const companyOfficersQuery = useCompanyOfficers(companyNumber);

  const officersNodes =
    companyOfficersQuery?.data?.companyOfficers?.nodes?.filter(isTruthy) || [];
  const directorsDetails =
    getCreditApplicationByOrderUuidQuery.data?.creditApplicationByOrderUuid
      ?.directorsDetails;

  const defaultValues = useMemo(() => {
    return directorsDetails
      ? mapDirectorsDefaultValues(directorsDetails)
      : undefined;
  }, [directorsDetails]);

  const officers = useMemo(() => parseOfficers(officersNodes), [officersNodes]);

  const handleDirectorDetailsSave = (values: DirectorDetailsFormValues) =>
    saveDirectorDetails({
      variables: {
        input: mapFormValues(values, companyUuid),
      },
    });

  const handleCreditApplicationUpdate = (
    totalPercentage: number,
    directors?: DirectorFormValues[],
  ) =>
    createUpdateApplication({
      variables: {
        input: formValuesToInputCreditApplication({
          ...getCreditApplicationByOrderUuidQuery.data
            ?.creditApplicationByOrderUuid,
          directorsDetails: {
            directors,
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

  if (
    getDirectorDetailsQuery?.error ||
    companyOfficersQuery?.error ||
    !allDropDowns
  ) {
    const errorMessage = (
      getDirectorDetailsQuery?.error || companyOfficersQuery?.error
    )?.message;
    return <p>Error: {errorMessage}</p>;
  }

  return (
    <DirectorDetailsForm
      officers={officers}
      isEdited={isEdited}
      directorUuid={directorUuid}
      defaultValues={defaultValues}
      dropdownData={allDropDowns}
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
          .then(onCompleted)
          .catch(onError);
      }}
    />
  );
};

export default DirectorDetailsFormContainer;
