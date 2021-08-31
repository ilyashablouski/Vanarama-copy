import dynamic from 'next/dynamic';
import React from 'react';
import EmploymentForm from '../../components/EmploymentForm/EmploymentForm';
import { useEmploymentData, useUpdateEmployment } from './gql';
import { useGetCreditApplicationByOrderUuid } from '../../gql/creditApplication';
import { IEmploymentFormContainerProps } from './interfaces';
import { formValuesToInput } from './mappers';
import Skeleton from '../../components/Skeleton';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});

const EmploymentFormContainer: React.FC<IEmploymentFormContainerProps> = ({
  orderId,
  personUuid,
  onCompleted,
}) => {
  const { loading, error, data } = useEmploymentData(personUuid);
  const [saveEmploymentHistory] = useUpdateEmployment(personUuid, onCompleted);

  const {
    loading: creditApplicationLoading,
  } = useGetCreditApplicationByOrderUuid(orderId);

  if (loading || creditApplicationLoading) {
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
