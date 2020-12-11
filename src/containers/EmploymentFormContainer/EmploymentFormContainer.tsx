import dynamic from 'next/dynamic';
import React from 'react';
import EmploymentForm from '../../components/EmploymentForm/EmploymentForm';
import { useEmploymentData, useUpdateEmployment } from './gql';
import { IEmploymentFormContainerProps } from './interfaces';
import { formValuesToInput } from './mappers';
import Skeleton from '../../components/Skeleton';

const Loading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/loading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const EmploymentFormContainer: React.FC<IEmploymentFormContainerProps> = ({
  personUuid,
  onCompleted,
}) => {
  const { loading, error, data } = useEmploymentData(personUuid);
  const [saveEmploymentHistory] = useUpdateEmployment(personUuid, onCompleted);

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.allDropDowns || !data.personByUuid) {
    return null;
  }

  const { partyId, employmentHistories } = data.personByUuid;
  return (
    <EmploymentForm
      dropDownData={data.allDropDowns}
      employments={employmentHistories || []}
      onSubmit={values =>
        saveEmploymentHistory({
          variables: {
            input: formValuesToInput(partyId, values),
          },
        })
      }
    />
  );
};

export default EmploymentFormContainer;
