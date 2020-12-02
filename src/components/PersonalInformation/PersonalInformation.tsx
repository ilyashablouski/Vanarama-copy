import React, { useState } from 'react';
import Button from '@vanarama/uibook/lib/components/atoms/button/';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import TextInput from '@vanarama/uibook/lib/components/atoms/textinput/';
import AddressFinder from '@vanarama/uibook/lib/components/molecules/address-finder';
import FormGroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import { useForm } from 'react-hook-form';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import CheckBox from '@vanarama/uibook/lib/components/atoms/checkbox/';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import validationSchema from './PersonalInformation.validation';
import { IPersonInformationFormValues, IProps } from './interface';
import { IAddressPerson } from '../../containers/PersonalInformationContainer/interfaces';
import { responseToInitialFormValues } from './mappers';

const PersonalInformation = ({ person, submit }: IProps) => {
  const personAddress = person?.address;

  const [editData, setEditData] = useState(false);
  const [address, setAddress] = useState<IAddressPerson | undefined>({
    id: personAddress?.serviceId || '',
    label: `${personAddress?.lineOne}${
      personAddress?.lineTwo ? `, ${personAddress?.lineTwo}` : ''
    } - ${personAddress?.city}, ${personAddress?.postcode}`,
  });

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
        className="form"
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
              // disabled={!editData}
            />
          </FormGroup>
          <Text color="darker" className="-pl-500" tag="p">
            You may unsubscribe from these communications at anytime. For
            further information please check out our
            <a
              key="a"
              className="link -teal -ml-100"
              href="/legal/privacy-policy"
              target="_blank"
            >
              Privacy Policy
            </a>
            .
          </Text>
        </div>
        {editData && (
          <Button
            type="submit"
            label={
              formState.isSubmitting ? 'Saving...' : 'Save New Personal Details'
            }
            color="primary"
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
            color="primary"
            onClick={() => {
              setEditData(!editData);
            }}
            disabled={formState.isSubmitting}
            dataTestId="personalSubmit"
          />
        )}
      </Form>
    </div>
  );
};

export default PersonalInformation;
