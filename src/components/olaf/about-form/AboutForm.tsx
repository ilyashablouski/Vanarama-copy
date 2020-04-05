import { FC } from 'react';
import { Row, Col } from 'react-grid-system';

import Heading from '@vanarama/uibook/packages/ui-components/src/components/atoms/heading';
import Text from '@vanarama/uibook/packages/ui-components/src/components/atoms/text';
import FormGroup from '@vanarama/uibook/packages/ui-components/src/components/molecules/formgroup';
import Select from '@vanarama/uibook/packages/ui-components/src/components/atoms/select/';
import TextInput from '@vanarama/uibook/packages/ui-components/src/components/atoms/textinput/';
import Button from '@vanarama/uibook/packages/ui-components/src/components/atoms/button/';
import ChevronForwardSharpIcon from '@vanarama/uibook/packages/ui-components/src/assets/icons/ChevronForwardCircleSharp';
import CheckBox from '@vanarama/uibook/packages/ui-components/src/components/atoms/checkbox/';
import { Controller, useForm } from 'react-hook-form';
import { genMonths, genYears } from '../../../services/utils/helpers';
import { IProps, IDetails } from './interface';
import validationSchema from './AboutForm.validation';

const AboutForm: FC<IProps> = ({ allDropDowns = {}, submit }) => {
  const months: string[] = genMonths() || [];
  const years: number[] = genYears(100) || [];

  const { handleSubmit, errors, control, reset, register } = useForm<IDetails>({
    mode: 'onBlur',
    validationSchema,
  });

  const onSubmission = (values: IDetails) => {
    submit(values);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmission)} id="aboutForm" className="form">
      <Heading color="black" size="xlarge">
        About You
      </Heading>
      <Text color="darker" size="lead">
        We just need some initial details for your credit check.
      </Text>
      <FormGroup legend="Title">
        <Controller
          name="title"
          options={allDropDowns.titles}
          data-testid="aboutTitle"
          as={Select}
          control={control}
        />
      </FormGroup>
      <FormGroup>
        <Row>
          <Col sm={8}>
            <TextInput
              name="firstName"
              label="First Name"
              type="text"
              data-testid="aboutFirstName"
              parentRef={register}
              invalid={errors?.firstName?.message}
            />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col sm={8}>
            <TextInput
              label="Last Name"
              type="text"
              name="lastName"
              data-testid="aboutLastName"
              parentRef={register}
              invalid={errors?.lastName?.message}
            />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col sm={6}>
            <TextInput
              label="Email"
              type="email"
              name="email"
              data-testid="aboutEmail"
              parentRef={register}
              invalid={errors?.email?.message}
            />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col sm={6}>
            <TextInput
              label="Mobile"
              type="tel"
              name="mobile"
              data-testid="aboutMobile"
              parentRef={register}
              invalid={errors?.mobile?.message}
            />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup legend="Date of Birth">
        <Row>
          <Col sm={4}>
            <Controller
              data-testid="aboutSelectDOB"
              name="dayOfBirth"
              as={Select}
              control={control}
              options={{
                data: [...Array(31)].map((_, i) => (i + 1).toString()),
              }}
            />
          </Col>
          <Col sm={4}>
            <Controller
              data-testid="aboutSelectMOB"
              name="monthOfBirth"
              as={Select}
              control={control}
              options={{
                data: months,
              }}
            />
          </Col>
          <Col sm={4}>
            <Controller
              data-testid="aboutSelectYOB"
              name="yearOfBirth"
              as={Select}
              control={control}
              options={{
                data: years.map(year => year.toString()),
              }}
            />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup legend="Country of Birth">
        <Controller
          name="countryOfBirth"
          as={Select}
          control={control}
          options={allDropDowns.countries}
          data-testid="aboutSelectCOB"
        />
      </FormGroup>
      <FormGroup legend="Nationality">
        <Controller
          name="nationality"
          as={Select}
          control={control}
          options={allDropDowns.nationalities}
          data-testid="aboutNationality"
        />
      </FormGroup>
      <FormGroup legend="Marital Status">
        <Controller
          name="maritalStatus"
          as={Select}
          control={control}
          options={allDropDowns.maritalStatuses}
          data-testid="aboutMaritalStatus"
        />
      </FormGroup>
      <FormGroup legend="No. of Dependants">
        <Controller
          name="dependants"
          as={Select}
          control={control}
          options={allDropDowns.noOfDependants}
          data-testid="aboutDependants"
        />
      </FormGroup>
      <FormGroup legend="No. of Adults in Household">
        <Controller
          name="adultsInHousehold"
          as={Select}
          control={control}
          options={allDropDowns.noOfAdultsInHousehold}
          data-testid="aboutAdultsInHouse"
        />
      </FormGroup>
      <FormGroup legend="Please Confirm">
        <Controller
          id="consent"
          data-testid="aboutConsent"
          as={CheckBox}
          control={control}
          name="consent"
          label="I wish to receive emails and SMS messages for updates on the latest deals, offers and promotions."
          defaultValue={false}
        />
        <Controller
          id="termsAndCons"
          data-testid="aboutTermsAndCons"
          as={CheckBox}
          control={control}
          name="termsAndCons"
          label="agree to the terms and conditions."
          defaultValue={false}
        />
      </FormGroup>

      <Button
        type="submit"
        label="Continue"
        color="primary"
        icon={<ChevronForwardSharpIcon />}
        iconPosition="after"
      />
    </form>
  );
};

export default AboutForm;
