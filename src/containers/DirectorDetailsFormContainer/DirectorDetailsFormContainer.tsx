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
  directorUuid,
}) => {
  const [saveDirectorDetails] = useSaveDirectorDetailsMutation();
  const [createUpdateApplication] = useCreateUpdateCreditApplication(
    orderUuid,
    () => { },
  );

  const handleDirectorDetailsSave = (values: DirectorDetailsFormValues) =>
    saveDirectorDetails({
      variables: {
        input: mapFormValues(values, companyUuid),
      },
    });

  const handleCreditApplicationUpdate = () =>
    createUpdateApplication({
      variables: {
        input: {
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

  if (!data?.companyByUuid?.companyNumber || !data.companyByUuid.associates || !data.allDropDowns) {
    return <p>Error: Could not load company data!</p>;
  }

  return (
    <DirectorDetailsForm
      directorUuid={directorUuid}
      dropdownData={data.allDropDowns}
      associates={data.companyByUuid.associates}
      companyNumber={data.companyByUuid.companyNumber}
      onSubmit={async values => {
        await handleDirectorDetailsSave(values)
          .then(handleCreditApplicationUpdate)
          .then(onCompleted)
          .catch(onError);
      }}
    />
  );
};

export default DirectorDetailsFormContainer;
