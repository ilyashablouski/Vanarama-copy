import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useAddressData, useUpdateAddresses } from './gql';
import { IAddressFormContainerProps } from './interfaces';
import { formValuesToInput } from './mappers';
import Skeleton from '../../components/Skeleton';
import { isUserAuthenticated } from '../../utils/authentication';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});
const AddressForm = dynamic(() =>
  import('../../components/AddressForm/AddressForm'),
);

const AddressFormContainer: React.FC<IAddressFormContainerProps> = ({
  isEdit,
  personUuid,
  onCompleted,
}) => {
  const { loading, error, data } = useAddressData(personUuid);
  const [updateAddresses] = useUpdateAddresses(personUuid, onCompleted);

  const addresses = useMemo(() => {
    if (!isEdit && !isUserAuthenticated()) {
      return [];
    }

    return data?.personByUuid?.addresses || [];
  }, [data?.personByUuid, isEdit]);

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.allDropDowns || !data.personByUuid) {
    return <p>Address details cannot be found</p>;
  }

  return (
    <AddressForm
      addresses={addresses}
      dropDownData={data.allDropDowns}
      onSubmit={values =>
        updateAddresses({
          variables: {
            input: formValuesToInput(data.personByUuid!.partyId, values),
          },
        })
      }
    />
  );
};

export default AddressFormContainer;
