import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';
import EmploymentForm from '../../components/EmploymentForm/EmploymentForm';
import { useEmploymentData, useUpdateEmployment } from './gql';
import { IEmploymentFormContainerProps } from './interfaces';
import { formValuesToInput } from './mappers';
import Skeleton from '../../components/Skeleton';
import { isUserAuthenticated } from '../../utils/authentication';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});

const EmploymentFormContainer: React.FC<IEmploymentFormContainerProps> = ({
  isEdit,
  personUuid,
  onCompleted,
}) => {
  const { loading, error, data } = useEmploymentData(personUuid);
  const [saveEmploymentHistory] = useUpdateEmployment(personUuid, onCompleted);

  const employmentHistories = useMemo(() => {
    if (!isEdit && !isUserAuthenticated()) {
      return [];
    }

    return data?.personByUuid?.employmentHistories || [];
  }, [data?.personByUuid?.employmentHistories, isEdit]);

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.allDropDowns || !data.personByUuid) {
    return null;
  }

  return (
    <EmploymentForm
      dropDownData={data.allDropDowns}
      employments={employmentHistories}
      onSubmit={values =>
        saveEmploymentHistory({
          variables: {
            input: formValuesToInput(data.personByUuid!.partyId, values),
          },
        })
      }
    />
  );
};

export default EmploymentFormContainer;
