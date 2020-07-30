import { DirectorDetailsFormValues } from '../../components/DirectorDetailsForm/interfaces';
import { historyToMoment, parseDate } from '../../utils/dates';

export const mapFormValues = (
  values: DirectorDetailsFormValues,
  companyUuid: string,
) => ({
  uuid: companyUuid,
  associates: values.directors.map(director => ({
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

export default mapFormValues;
