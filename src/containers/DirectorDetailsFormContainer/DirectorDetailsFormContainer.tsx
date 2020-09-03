import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import React, { useMemo } from 'react';
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
import { mapFormValues, mapDirectorsDefaultValues } from './mappers';
import { formValuesToInputCreditApplication } from '../../mappers/mappersCreditApplication';

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

  const handleCreditApplicationUpdate = (values: DirectorDetailsFormValues) =>
    createUpdateApplication({
      variables: {
        input: formValuesToInputCreditApplication({
          ...getCreditApplicationByOrderUuidQuery.data
            ?.creditApplicationByOrderUuid,
          directorsDetails: values,
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
          .then(() => handleCreditApplicationUpdate(values))
          .then(onCompleted)
          .catch(onError);
      }}
    />
  );
};

export default DirectorDetailsFormContainer;
