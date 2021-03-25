import { IAddressSuggestion } from 'core/molecules/address-finder/interfaces';
import {
  DirectorDetailsFormValues,
  DirectorFormValues,
  DirectorDetails,
} from '../../components/DirectorDetailsForm/interfaces';
import { parseDate } from '../../utils/dates';
import { SaveDirectorDetailsMutation_createUpdateCompanyDirector_associates as Associate } from '../../../generated/SaveDirectorDetailsMutation';
import { AddressInputObject } from '../../../generated/globalTypes';

export const mapFormValues = (
  values: DirectorDetailsFormValues,
  companyUuid: string,
  personUuid?: string,
) => {
  const addresses = (director: DirectorFormValues) =>
    director.history.map(directorHistory => ({
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
      businessShare: parseInt(director.shareOfBusiness, 10),
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

export const mapAddresses = (data?: any) =>
  data?.map((item: any) => ({
    city: item?.city,
    country: item?.country,
    county: item?.county,
    kind: item?.kind,
    lineOne: item?.line_one,
    lineThree: item?.line_three,
    lineTwo: item?.line_two,
    postcode: item?.postcode,
    serviceId: item?.service_id,
    startedOn: item?.started_on,
    status: item?.propertyStatus,
  }));

export const mapDirectorDetails = (data: any): DirectorDetails => ({
  dayOfBirth: data?.day_of_birth,
  gender: data?.gender,
  email: data?.email,
  history: data?.history?.map((item: any) => ({
    month: item?.month,
    status: item?.status,
    year: item?.year,
    address: item?.address
      ? {
          id: item?.address?.id,
          label: item?.address?.label,
        }
      : undefined,
  })),
  firstName: data?.first_name,
  originalFirstName: data?.original_first_name,
  lastName: data?.last_name,
  originalLastName: data?.original_last_name,
  monthOfBirth: data?.month_of_birth,
  numberOfDependants: data?.number_of_dependants,
  shareOfBusiness: data?.share_of_business,
  nationality: data?.nationality,
  title: data?.title,
  yearOfBirth: data?.year_of_birth,
  uuid: data?.uuid,
  addresses: mapAddresses(data?.addresses),
});

export const mapDirectorsDefaultValues = (
  data: any,
): DirectorDetailsFormValues => ({
  directors: (data?.directors || []).map((item: any) => {
    return mapDirectorDetails(item);
  }),
  totalPercentage: data?.total_percentage,
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

export default mapFormValues;
