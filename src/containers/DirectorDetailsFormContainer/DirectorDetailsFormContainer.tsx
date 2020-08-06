import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import React from 'react';
import DirectorDetailsForm from '../../components/DirectorDetailsForm/DirectorDetailsForm';
import { DirectorDetailsFormValues } from '../../components/DirectorDetailsForm/interfaces';
import { useCreateUpdateCreditApplication } from '../../gql/creditApplication';
import {
  useGetDirectorDetailsQuery,
  useSaveDirectorDetailsMutation,
} from './gql';
import { IDirectorDetailsFormContainerProps } from './interfaces';
import { mapFormValues } from './mappers';

export const DirectorDetailsFormContainer: React.FC<IDirectorDetailsFormContainerProps> = ({
  companyUuid,
  orderUuid,
  onCompleted,
  onError,
}) => {
  const [saveDirectorDetails] = useSaveDirectorDetailsMutation();
  const [createUpdateApplication] = useCreateUpdateCreditApplication(
    orderUuid,
    () => {},
  );

  const handleDirectorDetailsSave = (values: DirectorDetailsFormValues) =>
    saveDirectorDetails({
      variables: {
        input: mapFormValues(values, companyUuid),
      },
    });

  const handleCreditApplicationUpdate = (
    directorsDetails: DirectorDetailsFormValues,
  ) =>
    createUpdateApplication({
      variables: {
        input: {
          directorsDetails,
          orderUuid,
        },
      },
    });

  const { data, loading, error } = useGetDirectorDetailsQuery(companyUuid);

  if (loading) {
    return <Loading size="xlarge" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data?.companyByUuid?.companyNumber) {
    return <p>Error: Could not load company data!</p>;
  }

  return (
    <DirectorDetailsForm
      companyNumber={data.companyByUuid.companyNumber}
      onSubmit={async values => {
        await handleDirectorDetailsSave(values)
          .then(() => handleCreditApplicationUpdate(values))
          .then(onCompleted)
          .catch(onError);
      }}
    />
  );
};

export default DirectorDetailsFormContainer;
