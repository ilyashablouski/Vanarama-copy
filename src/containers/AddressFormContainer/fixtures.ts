import { GetAddressContainerDataQuery } from '../../../generated/GetAddressContainerDataQuery';

// eslint-disable-next-line import/prefer-default-export
export const noSavedAddresses: GetAddressContainerDataQuery = {
  personByUuid: {
    uuid: '1337',
    partyId: '911',
    addresses: [],
  },
  allDropDowns: {
    __typename: 'DropDownType',
    propertyStatuses: {
      __typename: 'DropDownDataType',
      data: ['Mortgage', 'Rented'],
      favourites: [],
    },
  },
};

export const withSavedAddresses = (
  date: string,
): GetAddressContainerDataQuery => ({
  personByUuid: {
    uuid: '1337',
    partyId: '911',
    addresses: [
      {
        __typename: 'AddressType',
        serviceId: 'GB|1337',
        uuid: 'a1e79c5d-4e69-4098-aede-e55ac8394123',
        lineOne: 'Buckingham Palace',
        lineTwo: 'Westminster',
        lineThree: 'Westminster',
        city: 'London',
        postcode: 'SW1A 1AA',
        propertyStatus: 'Rented',
        startedOn: date,
        endedOn: '1990-2-01',
        country: '',
        kind: '',
      },
      {
        __typename: 'AddressType',
        serviceId: 'GB|002',
        uuid: '88924d6c-ddb5-4067-97c4-081dbed0318a',
        lineOne: '742 Evergreen Terrace',
        lineTwo: '',
        lineThree: '',
        city: 'Springfield',
        postcode: '49007',
        propertyStatus: 'Mortgage',
        startedOn: '1990-1-01',
        endedOn: '1990-2-01',
        country: '',
        kind: '',
      },
    ],
  },
  allDropDowns: {
    __typename: 'DropDownType',
    propertyStatuses: {
      __typename: 'DropDownDataType',
      data: ['Mortgage', 'Rented'],
      favourites: [],
    },
  },
});

export const withSavedAddressesInWrongOrder = (
  date: string,
): GetAddressContainerDataQuery => ({
  personByUuid: {
    uuid: '1337',
    partyId: '911',
    addresses: [
      {
        __typename: 'AddressType',
        serviceId: 'GB|002',
        uuid: '88924d6c-ddb5-4067-97c4-081dbed0318a',
        lineOne: '742 Evergreen Terrace',
        lineTwo: '',
        lineThree: '',
        city: 'Springfield',
        postcode: '49007',
        propertyStatus: 'Mortgage',
        startedOn: '1990-1-01',
        endedOn: '1990-2-01',
        country: '',
        kind: '',
      },
      {
        __typename: 'AddressType',
        serviceId: 'GB|1337',
        uuid: 'a1e79c5d-4e69-4098-aede-e55ac8394123',
        lineOne: 'Buckingham Palace',
        lineTwo: 'Westminster',
        lineThree: 'Westminster',
        city: 'London',
        postcode: 'SW1A 1AA',
        propertyStatus: 'Rented',
        startedOn: date,
        endedOn: '1990-2-01',
        country: '',
        kind: '',
      },
    ],
  },
  allDropDowns: {
    __typename: 'DropDownType',
    propertyStatuses: {
      __typename: 'DropDownDataType',
      data: ['Mortgage', 'Rented'],
      favourites: [],
    },
  },
});
