import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import React from 'react';
import DirectorDetailsForm from '../../components/DirectorDetailsForm/DirectorDetailsForm';
import { DirectorDetailsFormValues } from '../../components/DirectorDetailsForm/interfaces';
import {
  useCreateUpdateCreditApplication,
  useGetCreditApplicationByOrderUuid,
} from '../../gql/creditApplication';
import {
  useGetDirectorDetailsQuery,
  useSaveDirectorDetailsMutation,
} from './gql';
import { IDirectorDetailsFormContainerProps } from './interfaces';
import { mapFormValues } from './mappers';
import { formValuesToInputCreditApplication } from '../../mappers/mappersCreditApplication';

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
  const getDirectorDetailsQuery = useGetDirectorDetailsQuery(companyUuid);
  const getCreditApplicationByOrderUuidQuery = useGetCreditApplicationByOrderUuid(
    orderUuid,
  );
  const directorDetails =
    getCreditApplicationByOrderUuidQuery.data?.creditApplicationByOrderUuid
      ?.directorsDetails;

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
        input: formValuesToInputCreditApplication({
          ...getCreditApplicationByOrderUuidQuery.data
            ?.creditApplicationByOrderUuid,
          directorsDetails,
          orderUuid,
        }),
      },
    });

  if (
    getDirectorDetailsQuery?.loading ||
    getCreditApplicationByOrderUuidQuery.loading
  ) {
    return <Loading size="xlarge" />;
  }

  if (
    getDirectorDetailsQuery?.error ||
    getCreditApplicationByOrderUuidQuery?.error
  ) {
    const errorMessage = (
      getDirectorDetailsQuery?.error ||
      getCreditApplicationByOrderUuidQuery?.error
    )?.message;
    return <p>Error: {errorMessage}</p>;
  }

  return (
    <DirectorDetailsForm
      isEdited
      directorDetails={directorDetails}
      dropdownData={getDirectorDetailsQuery.data?.allDropDowns!}
      associates={getDirectorDetailsQuery.data?.companyByUuid?.associates!}
      companyNumber={
        getDirectorDetailsQuery.data?.companyByUuid?.companyNumber!
      }
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
