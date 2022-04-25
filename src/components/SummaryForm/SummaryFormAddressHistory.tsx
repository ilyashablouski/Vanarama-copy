import StructuredList from 'core/organisms/structured-list';
import { IList } from 'core/organisms/structured-list/interfaces';
import { gql } from '@apollo/client';
import React, { useMemo } from 'react';
import { SummaryFormAddressHistoryAddress } from '../../../generated/SummaryFormAddressHistoryAddress';
import { addressToDisplay } from '../../utils/address';
import FCWithFragments from '../../utils/FCWithFragments';
import { defaultFormatDate } from '../../utils/dates';

interface IProps {
  addresses: SummaryFormAddressHistoryAddress[];
  onEdit: () => any;
}

const SummaryFormAddressHistory: FCWithFragments<IProps> = ({
  addresses,
  onEdit,
}) => {
  const items = useMemo(() => reduceToItems(addresses), [addresses]);
  return (
    <StructuredList
      editable
      editDataTestId="edit-address-history"
      onEditClicked={onEdit}
      list={items}
      heading="Address History"
      headingDataTestId="address_history_data_testId"
    />
  );
};

function reduceToItems(addresses: SummaryFormAddressHistoryAddress[]) {
  return [...addresses]
    .sort(
      (firstAddress, secondAddress) =>
        new Date(secondAddress.startedOn ?? '').getTime() -
        new Date(firstAddress.startedOn ?? '').getTime(),
    )
    .reduce(
      (acc, address, index) => [
        ...acc,
        {
          label: 'Address',
          value: addressToDisplay(address),
          dataTestId: `summary-address[${index}]`,
        },
        {
          label: 'Property Status',
          value: address.propertyStatus || '',
          dataTestId: `summary-address[${index}].status`,
        },
        {
          label: 'Date Moved In',
          value: address.startedOn
            ? defaultFormatDate(new Date(address.startedOn), '/')
            : '',
          dataTestId: `summary-address[${index}].moved-in`,
        },
      ],
      [] as IList[],
    );
}

SummaryFormAddressHistory.fragments = {
  addresses: gql`
    fragment SummaryFormAddressHistoryAddress on AddressType {
      __typename
      uuid
      lineOne
      lineTwo
      city
      postcode
      propertyStatus
      startedOn
    }
  `,
};

export default SummaryFormAddressHistory;
