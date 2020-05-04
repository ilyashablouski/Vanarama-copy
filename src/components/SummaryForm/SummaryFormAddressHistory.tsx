import StructuredList from '@vanarama/uibook/lib/components/organisms/structured-list';
import { IList } from '@vanarama/uibook/lib/components/organisms/structured-list/interfaces';
import { gql } from 'apollo-boost';
import moment from 'moment';
import React, { useMemo } from 'react';
import { SummaryFormAddressHistoryAddress } from '../../../generated/SummaryFormAddressHistoryAddress';
import { addressToDisplay } from '../../utils/address';
import FCWithFragments from '../../utils/FCWithFragments';

interface IProps {
  addresses: SummaryFormAddressHistoryAddress[];
}

const SummaryFormAddressHistory: FCWithFragments<IProps> = ({ addresses }) => {
  const items = useMemo(() => reduceToItems(addresses), [addresses]);
  return <StructuredList list={items} heading="Address History" />;
};

function reduceToItems(addresses: SummaryFormAddressHistoryAddress[]) {
  return addresses
    .sort(
      (a, b) =>
        new Date(b.startedOn).getTime() - new Date(a.startedOn).getTime(),
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
            ? moment(address.startedOn).format('DD/MM/YYYY')
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
