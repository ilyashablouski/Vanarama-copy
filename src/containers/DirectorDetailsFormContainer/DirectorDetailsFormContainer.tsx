import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import React from 'react';
import DirectorDetailsForm from '../../components/DirectorDetailsForm/DirectorDetailsForm';
import { historyToMoment, parseDate } from '../../utils/dates';
import { LimitedCompanyInputObject } from '../../../generated/globalTypes';
import { useCreateUpdateCreditApplication } from '../../gql/creditApplication';
import {
  useGetDirectorDetailsQuery,
  useSaveDirectorDetailsMutation,
} from './gql';
import { IDirectorDetailsFormContainerProps } from './interfaces';

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

  const { data, loading, error } = useGetDirectorDetailsQuery(companyUuid);

  if (loading) {
    return <Loading size="xlarge" />;
  }

  if (
    error ||
    !data ||
    !data.companyByUuid ||
    !data.companyByUuid.companyNumber
  ) {
    return <p>Error: Could not load company data!</p>;
  }

  return (
    <DirectorDetailsForm
      companyNumber={data.companyByUuid.companyNumber}
      onSubmit={async values => {
        const input: LimitedCompanyInputObject = {
          uuid: companyUuid,
          associates: values.directors.map(director => ({
            firstName: director.firstName,
            lastName: director.lastName,
            businessShare: parseInt(director.shareOfBusiness, 10),
            addresses: director.history.map(_ => ({
              serviceId: _.address!.id,
              propertyStatus: _.status,
              startedOn: historyToMoment(_).format('YYYY-MM-DD'),
            })),
            gender: director.gender,
            title: director.title,
            dateOfBirth: parseDate(
              director.dayOfBirth,
              director.monthOfBirth,
              director.yearOfBirth,
            ).format('YYYY-MM-DD'),
            role: { position: 'director' },
            noOfDependants: director.numberOfDependants,
          })),
        };

        await saveDirectorDetails({
          variables: {
            input,
          },
        })
          .then(() =>
            createUpdateApplication({
              variables: {
                input: {
                  orderUuid,
                },
              },
            }),
          )
          .then(onCompleted)
          .catch(onError);
      }}
    />
  );
};

export default DirectorDetailsFormContainer;
