import dynamic from 'next/dynamic';
import React, { useMemo, useState } from 'react';
import AboutForm from '../../components/AboutForm';
import { IAboutFormValues } from '../../components/AboutForm/interface';
import { useCreatePerson, useAboutYouData, useAboutPageDataQuery } from './gql';
import { useGetCreditApplicationByOrderUuid } from '../../gql/creditApplication';
import { IProps } from './interfaces';
import { formValuesToInput } from './mappers';
import {
  useRegistrationForTemporaryAccessMutation,
  handlerMock,
} from '../../gql/temporaryRegistration';
import { RegisterForTemporaryAccess_registerForTemporaryAccess as IRegistrationResult } from '../../../generated/RegisterForTemporaryAccess';
import Skeleton from '../../components/Skeleton';
import { isUserAuthenticated } from '../../utils/authentication';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});

const AboutFormContainer: React.FC<IProps> = ({
  isEdit,
  orderId,
  onCompleted,
  personUuid,
  onLogInClick,
  onRegistrationClick,
}) => {
  const aboutPageDataQuery = useAboutPageDataQuery();
  const [createPerson] = useCreatePerson();
  const aboutYouData = useAboutYouData(personUuid);
  const [registerTemporary] = useRegistrationForTemporaryAccessMutation();

  const creditApplicationQuery = useGetCreditApplicationByOrderUuid(orderId);
  const [isSubmit, setIsSubmit] = useState(false);

  const person = useMemo(() => {
    if (!isEdit && !isUserAuthenticated()) {
      return null;
    }

    return aboutYouData.data?.personByUuid;
  }, [aboutYouData.data?.personByUuid, isEdit]);

  const handleTemporaryRegistrationIfGuest = (
    username: string,
    firstName: string,
    lastName: string,
  ) =>
    aboutYouData.data?.personByUuid
      ? handlerMock(
          personUuid || null,
          aboutYouData.data?.personByUuid?.emailAddresses[0],
        )
      : registerTemporary({
          variables: {
            username,
            firstName,
            lastName,
          },
        });

  const handlePersonCreation = (
    values: IAboutFormValues,
    data?: IRegistrationResult | null,
  ) =>
    createPerson({
      variables: {
        input: formValuesToInput(values, data),
      },
    });

  if (aboutPageDataQuery.loading || creditApplicationQuery.loading) {
    return <Loading size="large" />;
  }

  if (aboutPageDataQuery.error) {
    return <p>Error: {aboutPageDataQuery.error.message}</p>;
  }

  if (!aboutPageDataQuery.data?.allDropDowns) {
    return null;
  }

  return (
    <AboutForm
      dropdownData={aboutPageDataQuery.data!.allDropDowns}
      person={person}
      isEmailDisabled={!!aboutYouData.data?.personByUuid}
      onLogInClick={onLogInClick}
      onRegistrationClick={onRegistrationClick}
      isSubmit={isSubmit}
      submit={values => {
        setIsSubmit(true);
        return handleTemporaryRegistrationIfGuest(
          values.email,
          values.firstName,
          values.lastName,
        )
          .then(query =>
            handlePersonCreation(
              values,
              query.data?.registerForTemporaryAccess,
            ),
          )
          .then(operation => onCompleted?.(operation?.data));
      }}
    />
  );
};

export default AboutFormContainer;
