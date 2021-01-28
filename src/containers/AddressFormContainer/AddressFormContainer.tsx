import React from 'react';
import dynamic from 'next/dynamic';
import { useAddressData, useUpdateAddresses } from './gql';
import { IAddressFormContainerProps } from './interfaces';
import { formValuesToInput } from './mappers';
import Skeleton from '../../components/Skeleton';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});
const AddressForm = dynamic(() =>
  import('../../components/AddressForm/AddressForm'),
);

const AddressFormContainer: React.FC<IAddressFormContainerProps> = ({
  personUuid,
  onCompleted,
}) => {
  const { loading, error, data } = useAddressData(personUuid);
  const [updateAddresses] = useUpdateAddresses(personUuid, onCompleted);
  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.allDropDowns || !data.personByUuid) {
    return <p>Address details cannot be found</p>;
  }

  const { addresses, partyId } = data.personByUuid;
  return (
    <AddressForm
      addresses={addresses || []}
      dropDownData={data.allDropDowns}
      onSubmit={values => {
        console.log('>>>', values);
        return updateAddresses({
          variables: {
            input: formValuesToInput(partyId, values),
          },
        });
      }}
    />
  );
};

export default AddressFormContainer;
