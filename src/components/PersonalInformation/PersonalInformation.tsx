import React, { useState } from 'react';
import Button from '@vanarama/uibook/lib/components/atoms/button/';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import TextInput from '@vanarama/uibook/lib/components/atoms/textinput/';
import AddressFinder from '@vanarama/uibook/lib/components/molecules/address-finder';
import FormGroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import { useForm } from 'react-hook-form';
import validationSchema from './PersonalInformation.validation';
import { IPersonalInformationFormValues, IProps } from './interface';
import { responseToInitialFormValues } from './mappers';

const apiKey = 'CG96-BE17-EY43-CM69';

const PersonalInformation = ({ person, submit }: IProps) => {
  const personAddress = person?.addresses[0];
  const telephoneNumber = person?.telephoneNumbers.find(_ => _.primary)?.value;
  const email = person?.emailAddresses.find(_ => _.primary)?.value;

  const [editData, setEditData] = useState(false);
  const [address, setAddress] = useState({
    id: person?.addresses[0]?.serviceId,
    label: `${personAddress.lineOne}, ${personAddress.lineTwo}${
      personAddress.lineTree ? `, ${personAddress.lineTree}` : ''
    } - ${personAddress.city}, ${personAddress.postcode}`,
  });

  const { errors, handleSubmit, formState } = useForm<
    IPersonalInformationFormValues
  >({
    mode: 'onBlur',
    validationSchema,
    defaultValues: responseToInitialFormValues(person),
  });

  return (
    <div className="my-details--form" style={{ gridColumnEnd: 6 }}>
      <form onSubmit={handleSubmit(submit)} className="form">
        <Heading color="black" size="large" dataTestId="aboutHeading">
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
                      value={person.person?.firstName}
                      dataTestId="aboutFirstName"
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
                      defaultValue={person?.person?.lastName}
                      dataTestId="personalLastName"
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
                    onSuggestionChange={value => {
                      setAddress(value);
                    }}
                    selected={address}
                  >
                    <FormGroup
                      className="address-finder--input"
                      controlId="empty"
                      selected={address}
                    >
                      <AddressFinder.Input
                        id="empty"
                        dataTestId="input_adress_personal_information"
                      />
                      <AddressFinder.Selected dataTestId="adress_personal_information__edit" />
                      <AddressFinder.Intermediate dataTestId="adress_personal_information__change" />
                    </FormGroup>
                    <AddressFinder.Results dataTestId="adress_personal_information__results" />
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
                      value={telephoneNumber || ''}
                      dataTestId="personalMobile"
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
              <div className="structured-list-td">
                {email}
              </div>
            </div>
          </div>
        </section>
        <Button
          type={!editData ? 'button' : 'submit'}
          label={formState.isSubmitting ? 'Saving...' : 'Edit Personal Details'}
          color="primary"
          onClick={() => {
            if (!editData) {
              setEditData(!editData);
              return false;
            }
            return true;
          }}
          disabled={formState.isSubmitting}
          dataTestId="personalSubmit"
        />
      </form>
    </div>
  );
};

export default PersonalInformation;
