import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import TextInput from 'core/atoms/textinput/';
import AddressFinder from 'core/molecules/address-finder';
import { useForm } from 'react-hook-form';
import CheckBox from 'core/atoms/checkbox/';
import validationSchema from './PersonalInformation.validation';
import { IPersonInformationFormValues, IProps } from './interface';
import { IAddressPerson } from '../../containers/PersonalInformationContainer/interfaces';
import { responseToInitialFormValues } from './mappers';
import Skeleton from '../Skeleton';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Button = dynamic(() => import('core/atoms/button'), {
  loading: () => <Skeleton count={4} />,
  ssr: false,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Form = dynamic(() => import('core/organisms/form'), {
  loading: () => <Skeleton count={3} />,
});
const FormGroup = dynamic(() => import('core/molecules/formgroup'), {
  loading: () => <Skeleton count={5} />,
});

const getAddressFromPerson = (person: IProps['person']) =>
  person?.address
    ? {
        id: person?.address?.serviceId || '',
        label: `${person?.address?.lineOne}, ${person?.address?.lineTwo ??
          ''} - ${person?.address?.city}, ${person?.address?.postcode}`,
      }
    : undefined;

const PersonalInformation = ({ person, submit }: IProps) => {
  const personAddress = getAddressFromPerson(person);

  const [editData, setEditData] = useState(false);
  const [address, setAddress] = useState<IAddressPerson | undefined>(
    personAddress,
  );

  const { errors, handleSubmit, register, formState } = useForm<
    IPersonInformationFormValues
  >({
    mode: 'onBlur',
    validationSchema,
    defaultValues: responseToInitialFormValues(person),
  });

  return (
    <div className="my-details--form" style={{ gridColumnEnd: 6 }}>
      <Form
        onSubmit={handleSubmit(values => {
          setEditData(false);
          return submit(values, address?.id);
        })}
      >
        <Heading color="black" size="large" dataTestId="personHeading">
          Personal Information
        </Heading>
        <section className="structured-list  -styled-headers">
          <div className="structured-list-tbody">
            <div className="structured-list-row">
              <div
                style={{ verticalAlign: 'middle' }}
                className="structured-list-td structured-list-content--nowrap -pr-600"
              >
                First Name
              </div>
              <div className="structured-list-td">
                {editData ? (
                  <FormGroup
                    className="structured-list-td structured-list-content --inline-preserved -pb-000 -pt-000 -pr-000"
                    controlId="firstName"
                    error={errors?.firstName?.message?.toString()}
                  >
                    <TextInput
                      id="firstName"
                      name="firstName"
                      type="text"
                      ref={register}
                      dataTestId="personFirstName"
                      style={{ minWidth: '35ch' }}
                    />
                  </FormGroup>
                ) : (
                  <>{person?.firstName || 'No information'}</>
                )}
              </div>
            </div>

            <div className="structured-list-row">
              <div
                style={{ verticalAlign: 'middle' }}
                className="structured-list-td structured-list-content--nowrap"
              >
                Last Name
              </div>
              <div className="structured-list-td">
                {editData ? (
                  <FormGroup
                    className="structured-list-td structured-list-content --inline-preserved -pt-000 -pb-000 -pr-000"
                    controlId="lastName"
                    error={errors?.lastName?.message?.toString()}
                  >
                    <TextInput
                      style={{ minWidth: '35ch' }}
                      id="lastName"
                      name="lastName"
                      type="text"
                      ref={register}
                      dataTestId="personLastName"
                    />
                  </FormGroup>
                ) : (
                  <>{person?.lastName || 'No information'}</>
                )}
              </div>
            </div>

            <div className="structured-list-row ">
              <div
                style={{ verticalAlign: 'middle' }}
                className="structured-list-td structured-list-content--nowrap"
              >
                Address
              </div>
              <div className="structured-list-td">
                {editData ? (
                  <AddressFinder
                    apiKey={process.env.LOQATE_KEY || ''}
                    onSuggestionChange={value => setAddress(value)}
                    selected={address}
                  >
                    <FormGroup
                      className="address-finder--input"
                      controlId="empty"
                    >
                      <AddressFinder.Input
                        style={{ minWidth: '35ch' }}
                        id="empty"
                        width={30}
                        dataTestId="input_adress_person_information"
                      />
                      <AddressFinder.Selected dataTestId="adress_person_information__edit" />
                      <AddressFinder.Intermediate dataTestId="adress_person_information__change" />
                    </FormGroup>
                    <AddressFinder.Results dataTestId="adress_person_information__results" />
                  </AddressFinder>
                ) : (
                  <>{address?.label || 'No information'}</>
                )}
              </div>
            </div>

            <div className="structured-list-row ">
              <div
                style={{ verticalAlign: 'middle' }}
                className="structured-list-td structured-list-content--nowrap"
              >
                Telephone
              </div>
              <div className="structured-list-td">
                {editData ? (
                  <FormGroup
                    className="structured-list-td structured-list-content --inline-preserved  -pb-000 -pt-000 -pr-000"
                    controlId="telephoneNumber"
                    error={errors?.telephoneNumber?.message?.toString()}
                  >
                    <TextInput
                      style={{ minWidth: '35ch' }}
                      id="telephoneNumber"
                      name="telephoneNumber"
                      type="tel"
                      ref={register}
                      dataTestId="personMobile"
                    />
                  </FormGroup>
                ) : (
                  <>{person?.telephoneNumber || 'No information'}</>
                )}
              </div>
            </div>

            <div className="structured-list-row ">
              <div
                style={{ verticalAlign: 'middle' }}
                className="structured-list-td structured-list-content--nowrap"
              >
                Email
              </div>
              <div className="structured-list-td">{person?.emailAddress}</div>
            </div>
          </div>
        </section>
        <div>
          <Heading color="black" size="large" dataTestId="updated">
            Keep Me Updated
          </Heading>
          <FormGroup
            label=""
            className="-mb-300 -mt-300"
            error={errors?.emailConsent?.message?.toString()}
          >
            <CheckBox
              id="emailConsent"
              dataTestId="emailConsent"
              name="emailConsent"
              label="I want to be kept updated about exclusive deals & offers from Vanarama."
              ref={register}
              defaultChecked={person?.emailConsent || false}
              disabled={!editData}
            />
          </FormGroup>
          <Text color="darker" className="-pl-500" tag="p">
            You may unsubscribe from these communications at anytime. For
            further information please check out our
            <a
              key="a"
              className="link -teal -ml-100"
              href="/legal/privacy-policy.html"
              target="_blank"
            >
              Privacy Policy
            </a>
            .
          </Text>
        </div>
        <div style={{ marginTop: '15px' }}>
          {editData && (
            <Button
              type="submit"
              label={
                formState.isSubmitting
                  ? 'Saving...'
                  : 'Save New Personal Details'
              }
              color="teal"
              disabled={formState.isSubmitting}
              dataTestId="personalSubmitEdit"
            />
          )}
          {!editData && (
            <Button
              type="button"
              label={
                formState.isSubmitting ? 'Saving...' : 'Edit Personal Details'
              }
              color="teal"
              onClick={() => {
                setEditData(!editData);
              }}
              disabled={formState.isSubmitting}
              dataTestId="personalSubmit"
            />
          )}
        </div>
      </Form>
    </div>
  );
};

export default PersonalInformation;
