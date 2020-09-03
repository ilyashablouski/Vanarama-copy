import {
  DirectorDetailsFormValues,
  DirectorFormValues,
} from '../../components/DirectorDetailsForm/interfaces';
import { historyToMoment, parseDate } from '../../utils/dates';
import { SaveDirectorDetailsMutation_createUpdateCompanyDirector_associates as Associate } from '../../../generated/SaveDirectorDetailsMutation';

export const mapFormValues = (
  values: DirectorDetailsFormValues,
  companyUuid: string,
) => ({
  uuid: companyUuid,
  associates: values.directors.map(director => ({
    uuid: director.uuid,
    firstName: director.firstName,
    lastName: director.lastName,
    businessShare: parseInt(director.shareOfBusiness, 10),
    addresses: director.history.map(_ => ({
      serviceId: _.address!.id,
      propertyStatus: _.status,
      startedOn: historyToMoment(_).format('YYYY-MM-DD'),
    })),
    gender: director.gender,
    title: director.title,
    dateOfBirth: parseDate(
      director.dayOfBirth,
      director.monthOfBirth,
      director.yearOfBirth,
    ).format('YYYY-MM-DD'),
    role: { position: 'director' },
    noOfDependants: director.numberOfDependants,
  })),
});

export const mapDirectorDetails = (data: any): DirectorFormValues => ({
  dayOfBirth: data?.day_of_birth,
  firstName: data?.first_name,
  gender: data?.gender,
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
  lastName: data?.last_name,
  monthOfBirth: data?.month_of_birth,
  numberOfDependants: data?.number_of_dependants,
  shareOfBusiness: data?.share_of_business,
  title: data?.title,
  yearOfBirth: data?.year_of_birth,
  uuid: data?.uuid,
});

export const mapDirectorsDefaultValues = (
  data: any,
): DirectorDetailsFormValues => ({
  directors: (data?.directors || []).map((item: any) =>
    mapDirectorDetails(item),
  ),
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
    return {
      ...(data || {}),
      ...director,
    };
  });
};

export default mapFormValues;
