import React, { useState } from 'react';
import Button from '@vanarama/uibook/lib/components/atoms/button/';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import TextInput from '@vanarama/uibook/lib/components/atoms/textinput/';
import AddressFinder from '@vanarama/uibook/lib/components/molecules/address-finder';
import FormGroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import { useForm } from 'react-hook-form';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import validationSchema from './PersonalInformation.validation';
import { IPersonalInformationFormValues, IProps } from './interface';
import { responseToInitialFormValues } from './mappers';

const apiKey = 'CG96-BE17-EY43-CM69';

const PersonalInformation = ({ person, submit }: IProps) => {
  const personAddress = person?.addresses?.find(_ => _.kind === 'Home');
  const telephoneNumber = person?.telephoneNumbers.find(_ => _.primary)?.value;
  const email = person?.emailAddresses.find(_ => _.primary)?.value;

  const [editData, setEditData] = useState(false);
  const [address, setAddress] = useState({
    id: person?.addresses[0]?.serviceId,
    label: `${personAddress?.lineOne}, ${personAddress?.lineTwo}${
      personAddress?.lineTree ? `, ${personAddress?.lineTree}` : ''
    } - ${personAddress?.city}, ${personAddress?.postcode}`,
  });

  const { errors, handleSubmit, register, formState } = useForm({
    mode: 'onBlur',
    // validationSchema,
    defaultValues: responseToInitialFormValues(person),
  });

  return (
    <div className="my-details--form" style={{ gridColumnEnd: 6 }}>
      <Form
        onSubmit={handleSubmit(values => submit(values, address))}
        className="form"
      >
        <Heading color="black" size="large" dataTestId="personHeading">
          Personal Information
        </Heading>
        <section className="structured-list  -styled-headers">
          <div className="structured-list-tbody">
            <div className="structured-list-row">
              <div className="structured-list-td structured-list-content--nowrap  -midle">
                Firs Name
              </div>
              <div className="structured-list-td">
                {!editData && (
                  <>{person?.person?.firstName || 'No information'}</>
                )}
                {editData && (
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
                      width={35}
                    />
                  </FormGroup>
                )}
              </div>
            </div>

            <div className="structured-list-row">
              <div className="structured-list-td structured-list-content--nowrap">
                Last Name
              </div>
              <div className="structured-list-td">
                {!editData && (
                  <>{person?.person?.lastName || 'No information'}</>
                )}
                {editData && (
                  <FormGroup
                    className="structured-list-td structured-list-content --inline-preserved -pt-000 -pb-000 -pr-000"
                    controlId="lastName"
                    error={errors?.lastName?.message?.toString()}
                  >
                    <TextInput
                      id="lastName"
                      name="lastName"
                      type="text"
                      ref={register}
                      dataTestId="personLastName"
                      width={35}
                    />
                  </FormGroup>
                )}
              </div>
            </div>

            <div className="structured-list-row ">
              <div className="structured-list-td structured-list-content--nowrap">
                Address
              </div>
              <div className="structured-list-td">
                {!editData && <>{address.label || 'No information'}</>}
                {editData && (
                  <AddressFinder
                    apiKey={apiKey}
                    onSuggestionChange={value => setAddress(value)}
                    selected={address}
                  >
                    <FormGroup
                      className="address-finder--input"
                      controlId="empty"
                      selected={address}
                    >
                      <AddressFinder.Input
                        id="empty"
                        ref={register}
                        dataTestId="input_adress_person_information"
                      />
                      <AddressFinder.Selected dataTestId="adress_person_information__edit" />
                      <AddressFinder.Intermediate dataTestId="adress_person_information__change" />
                    </FormGroup>
                    <AddressFinder.Results dataTestId="adress_person_information__results" />
                  </AddressFinder>
                )}
              </div>
            </div>

            <div className="structured-list-row ">
              <div className="structured-list-td structured-list-content--nowrap">
                Telephone
              </div>
              <div className="structured-list-td">
                {!editData && <>{telephoneNumber || 'No information'}</>}
                {editData && (
                  <FormGroup
                    className="structured-list-td structured-list-content --inline-preserved  -pb-000 -pt-000 -pr-000"
                    controlId="mobile"
                    error={errors?.mobile?.message?.toString()}
                  >
                    <TextInput
                      id="mobile"
                      name="mobile"
                      type="tel"
                      ref={register}
                      dataTestId="personMobile"
                      width={35}
                    />
                  </FormGroup>
                )}
              </div>
            </div>

            <div className="structured-list-row ">
              <div className="structured-list-td structured-list-content--nowrap">
                Email
              </div>
              <div className="structured-list-td">{email}</div>
            </div>
          </div>
        </section>
        <Button
          type="submit"
          label={
            formState.isSubmitting
              ? 'Saving...'
              : (!editData && 'Edit Personal Details') ||
                'Save New Personal Details'
          }
          color="primary"
          onClick={() => {
            setEditData(!formState.isSubmitting);
          }}
          disabled={formState.isSubmitting}
          dataTestId="personalSubmit"
        />
      </Form>
    </div>
  );
};

export default PersonalInformation;
