import { IAddressSuggestion } from 'core/molecules/address-finder/interfaces';
import {
  DirectorDetailsFormValues,
  DirectorFormValues,
  DirectorDetails,
} from '../../components/DirectorDetailsForm/interfaces';
import { parseDate } from '../../utils/dates';
import { SaveDirectorDetailsMutation_createUpdateCompanyDirector_associates as Associate } from '../../../generated/SaveDirectorDetailsMutation';
import { AddressInputObject } from '../../../generated/globalTypes';
import { FunderDirectors } from '../../../generated/FunderDirectors';
import {
  GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid as ICreditApplication,
  GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_directorsDetailsV2_directors as ICreditApplicationDirectors,
  GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_directorsDetailsV2_directors_addresses as ICreditApplicationAdresses,
} from '../../../generated/GetCreditApplicationByOrderUuid';
import { CompanyAssociate_addresses } from '../../../generated/CompanyAssociate';
import { addressToDisplay } from '../../utils/address';

export const mapFormValues = (
  values: DirectorDetailsFormValues,
  companyUuid: string,
  personUuid?: string,
) => {
  const addresses = (director: DirectorFormValues) =>
    director.history.map(directorHistory => ({
      ...(directorHistory.address || {}),
      id: undefined,
      label: undefined,
      serviceId: directorHistory.address!.id,
      propertyStatus: directorHistory.status,
      startedOn: parseDate('01', directorHistory.month, directorHistory.year),
    }));
  return {
    person: {
      uuid: personUuid,
    },
    uuid: companyUuid,
    associates: values.directors.map(director => ({
      uuid: director.uuid,
      firstName: director.firstName,
      lastName: director.lastName,
      businessShare: parseFloat(director.shareOfBusiness),
      addresses:
        addresses(director).length > 0 ? addresses(director) : undefined,
      gender: director.gender,
      emailAddress: {
        value: director.email || '',
      },
      title: director.title,
      dateOfBirth: parseDate(
        director.dayOfBirth,
        director.monthOfBirth,
        director.yearOfBirth,
      ),
      role: { position: 'Director' },
      noOfDependants: director.numberOfDependants,
      nationality: director.nationality,
    })),
  };
};

export const mapHistoryAddresses = (
  data?: ICreditApplicationAdresses | null,
): IAddressSuggestion => {
  return {
    id: data?.serviceId || undefined,
    city: data?.city ?? '',
    country: data?.country ?? '',
    lineOne: data?.lineOne ?? '',
    label: data ? addressToDisplay(data) : '',
    lineTwo: data?.lineTwo ?? '',
    postcode: data?.postcode ?? '',
  };
};

export const mapAddresses = (
  data?: ICreditApplicationAdresses[] | null,
): Array<CompanyAssociate_addresses> =>
  (data ?? []).map(item => ({
    city: item?.city ?? '',
    lineOne: item?.lineOne ?? '',
    lineTwo: item?.lineTwo ?? '',
    postcode: item?.postcode ?? '',
    propertyStatus: item?.propertyStatus ?? '',
    serviceId: item?.serviceId ?? '',
    startedOn: item?.startedOn ?? '',
  }));

export const mapDirectorDetails = (
  data: ICreditApplicationDirectors,
): DirectorDetails => ({
  dayOfBirth: data?.dayOfBirth ?? '',
  gender: data?.gender ?? '',
  email: data?.email ?? '',
  history: (data?.history ?? [])?.map(item => ({
    month: item?.month ?? '',
    status: item?.status,
    year: item?.year ?? '',
    address: mapHistoryAddresses(item?.address),
  })),
  firstName: data?.firstName,
  originalFirstName: data?.originalFirstName ?? '',
  lastName: data?.lastName,
  originalLastName: data?.originalLastName ?? '',
  monthOfBirth: data?.monthOfBirth ?? '',
  numberOfDependants: data?.numberOfDependants ?? '',
  shareOfBusiness: String(data?.shareOfBusiness ?? ''),
  nationality: data?.nationality ?? '',
  title: data?.title ?? '',
  yearOfBirth: data?.yearOfBirth ?? '',
  uuid: data?.uuid ?? '',
  addresses: mapAddresses(data?.addresses),
});

export const mapDirectorsDefaultValues = (
  data?: ICreditApplication['directorsDetailsV2'],
): DirectorDetailsFormValues => ({
  directors: (data?.directors || []).map(item => {
    return mapDirectorDetails(item);
  }),
  totalPercentage: data?.totalPercentage ?? 0,
});

export const combineUpdatedDirectors = (
  directors: DirectorFormValues[],
  associates?: Associate[] | null,
) => {
  return directors.map(director => {
    const data = associates?.find(
      associate =>
        associate.firstName === director.firstName &&
        associate.lastName === director.lastName,
    );

    // merge addresses data from BE and address finder
    const history = director.history.map(item => {
      const associatedAddress = data?.addresses?.find(
        address => address.serviceId === item.address?.id,
      );

      return {
        ...item,
        address: {
          ...item.address,
          ...(associatedAddress || {}),
        } as IAddressSuggestion & AddressInputObject,
      };
    });

    return {
      ...director,
      ...(data || {}),
      history,
    };
  });
};

export const mapValidationParams = (
  data?: FunderDirectors['funderDirectors'],
) => {
  const numOfDirectors = parseInt(data?.funderData?.num_of_directors, 10);
  const percentageShares = parseInt(data?.funderData?.percentage_shares, 10);

  return {
    id: data?.id,
    // request minimum 1 director and minimum 25% of share in case of invalid data
    numOfDirectors: Number.isNaN(numOfDirectors) ? 1 : numOfDirectors,
    percentageShares: Number.isNaN(percentageShares) ? 25 : percentageShares,
  };
};

export default mapFormValues;
