import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';
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
  useCompanyOfficers,
  useFunderDirectors,
  useGetDirectorDetailsQuery,
  useSaveDirectorDetailsMutation,
} from './gql';
import { IDirectorDetailsFormContainerProps } from './interfaces';
import {
  combineUpdatedDirectors,
  mapDirectorsDefaultValues,
  mapFormValues, mapValidationParams
} from './mappers';
import { parseOfficers } from '../../components/DirectorDetailsForm/helpers';
import { isTruthy } from '../../utils/array';
import Skeleton from '../../components/Skeleton';
import { CompanyTypes } from '../../models/enum/CompanyTypes';
import { FunderCompanyTypeEnum } from '../../../generated/globalTypes';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});

export const DirectorDetailsFormContainer: React.FC<IDirectorDetailsFormContainerProps> = ({
  directorUuid,
  companyUuid,
  orderUuid,
  personUuid,
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
  const allDropDowns = getDirectorDetailsQuery.data?.allDropDowns;
  const companyNumber =
    getDirectorDetailsQuery.data?.companyByUuid?.companyNumber;
  const companyOfficersQuery = useCompanyOfficers(companyNumber || '');

  const officersNodes =
    companyOfficersQuery?.data?.companyOfficers?.nodes?.filter(isTruthy) || [];
  const directorsDetails =
    getCreditApplicationByOrderUuidQuery.data?.creditApplicationByOrderUuid
      ?.directorsDetails;
  const funderId =
    getCreditApplicationByOrderUuidQuery.data?.creditApplicationByOrderUuid
      ?.lineItem?.vehicleProduct?.funderId;
  const companyTypeLabel =
    getCreditApplicationByOrderUuidQuery.data?.creditApplicationByOrderUuid
      ?.aboutDetails?.company_type;
  const companyType = useMemo(
    () =>
      companyTypeLabel === CompanyTypes.limited
        ? FunderCompanyTypeEnum.limited
        : FunderCompanyTypeEnum.partnership,
    [companyTypeLabel],
  );

  const funderDirectorsQuery = useFunderDirectors(
    funderId || undefined,
    officersNodes.length,
    companyType,
  );

  const isEdit = useMemo(() => (directorsDetails?.directors || []).length > 0, [
    directorsDetails,
  ]);

  const funderDirectors = funderDirectorsQuery?.data?.funderDirectors;
  const funderDirectorsId = funderDirectorsQuery?.data?.funderDirectors?.id;
  const validationParams = useMemo(() => mapValidationParams(funderDirectors), [
    funderDirectorsId,
  ]);

  const defaultValues = useMemo(() => {
    return (directorsDetails?.directors || []).length > 0
      ? mapDirectorsDefaultValues(directorsDetails)
      : undefined;
  }, [directorsDetails]);

  const officers = useMemo(() => parseOfficers(officersNodes), [officersNodes]);

  const handleDirectorDetailsSave = (values: DirectorDetailsFormValues) =>
    saveDirectorDetails({
      variables: {
        input: mapFormValues(values, companyUuid, personUuid),
      },
    });

  const handleCreditApplicationUpdate = (
    totalPercentage: number,
    directors?: DirectorFormValues[],
  ) =>
    createUpdateApplication({
      variables: {
        input: {
          directorsDetails: {
            directors,
            totalPercentage,
          },
          orderUuid,
        },
      },
    });

  if (
    getDirectorDetailsQuery?.error ||
    companyOfficersQuery?.error ||
    funderDirectorsQuery?.error
  ) {
    const errorMessage = (
      getDirectorDetailsQuery?.error ||
      companyOfficersQuery?.error ||
      funderDirectorsQuery?.error
    )?.message;
    return <p>Error: {errorMessage}</p>;
  }

  if (
    getDirectorDetailsQuery?.loading ||
    getCreditApplicationByOrderUuidQuery?.loading ||
    companyOfficersQuery?.loading ||
    funderDirectorsQuery?.loading ||
    !allDropDowns
  ) {
    return <Loading size="xlarge" />;
  }

  return (
    <DirectorDetailsForm
      officers={officers}
      isEdit={isEdit}
      directorUuid={directorUuid}
      defaultValues={defaultValues}
      dropdownData={allDropDowns}
      validationParams={validationParams}
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
