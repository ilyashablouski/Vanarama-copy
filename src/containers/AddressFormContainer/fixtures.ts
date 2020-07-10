import { GetAddressContainerDataQuery } from '../../../generated/GetAddressContainerDataQuery';

// eslint-disable-next-line import/prefer-default-export
export const noSavedAddresses: GetAddressContainerDataQuery = {
  personByUuid: {
    uuid: '6f6ed68c-0ccf-4799-b328-f9e0c7df5203',
    partyId: '1057',
    addresses: [],
  },
  allDropDowns: {
    __typename: 'DropDownType',
    propertyStatuses: {
      __typename: 'DropDownDataType',
      data: ['Owned with mortgage', 'Rented'],
      favourites: [],
    },
  },
};

export const withSavedAddressesInWrongOrder = (
  date: string,
): GetAddressContainerDataQuery => ({
  personByUuid: {
    uuid: '1337',
    partyId: '1057',
    addresses: [
      {
        __typename: 'AddressType',
        serviceId: 'GB|1337',
        uuid: 'dc3fc904-ed63-4b5d-b203-c5088c3a5047',
        lineOne: '432 Union Street',
        lineTwo: '',
        city: 'Aberdeen',
        postcode: 'AB10 1TR',
        propertyStatus: 'Rented',
        startedOn: date,
      },
      {
        __typename: 'AddressType',
        serviceId: 'GB|002',
        uuid: 'a829bc09-bfd9-4b60-98a9-b60f6622d9ad',
        lineOne: 'Marischal College',
        lineTwo: 'Broad Street',
        city: 'Aberdeen',
        postcode: 'AB10 1AG',
        propertyStatus: 'Owned with mortgage',
        startedOn: '1990-01-01',
      },
    ],
  },
  allDropDowns: {
    __typename: 'DropDownType',
    propertyStatuses: {
      __typename: 'DropDownDataType',
      data: ['Owned with mortgage', 'Rented'],
      favourites: [],
    },
  },
});

export const withSavedAddresses = (
  date: string,
): GetAddressContainerDataQuery => ({
  personByUuid: {
    uuid: '1337',
    partyId: '1057',
    addresses: [
      {
        __typename: 'AddressType',
        serviceId: 'GB|002',
        uuid: 'a829bc09-bfd9-4b60-98a9-b60f6622d9ad',
        lineOne: 'Marischal College',
        lineTwo: 'Broad Street',
        city: 'Aberdeen',
        postcode: 'AB10 1AG',
        propertyStatus: 'Owned with mortgage',
        startedOn: '1990-01-01',
      },
      {
        __typename: 'AddressType',
        serviceId: 'GB|1337',
        uuid: 'dc3fc904-ed63-4b5d-b203-c5088c3a5047',
        lineOne: '432 Union Street',
        lineTwo: '',
        city: 'Aberdeen',
        postcode: 'AB10 1TR',
        propertyStatus: 'Rented',
        startedOn: date,
      },
    ],
  },
  allDropDowns: {
    __typename: 'DropDownType',
    propertyStatuses: {
      __typename: 'DropDownDataType',
      data: ['Owned with mortgage', 'Rented'],
      favourites: [],
    },
  },
});
