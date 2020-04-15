import ChevronForwardSharpIcon from '@vanarama/uibook/lib/assets/icons/ChevronForwardCircleSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button/';
import CheckBox from '@vanarama/uibook/lib/components/atoms/checkbox/';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Select from '@vanarama/uibook/lib/components/atoms/select/';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import TextInput from '@vanarama/uibook/lib/components/atoms/textinput/';
import FormGroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import { gql } from 'apollo-boost';
import { useForm } from 'react-hook-form';
import FCWithFragments from '../../../utils/FCWithFragments';
import { genMonths, genYears } from '../../../utils/helpers';
import OptionsWithFavourites from '../../OptionsWithFavourites/OptionsWithFavourites';
import validationSchema from './AboutForm.validation';
import { IAboutFormValues, IProps } from './interface';

const AboutForm: FCWithFragments<IProps> = ({ dropdownData, submit }) => {
  const months: string[] = genMonths() || [];
  const years: number[] = genYears(100) || [];

  const { handleSubmit, errors, reset, register, clearError } = useForm<
    IAboutFormValues
  >({
    mode: 'onBlur',
    validationSchema,
  });

  const onSubmission = (values: IAboutFormValues) => {
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
      <FormGroup controlId="title" label="Title" error={errors?.title?.message}>
        <Select id="title" name="title" dataTestId="aboutTitle" ref={register}>
          <OptionsWithFavourites options={dropdownData.titles} />
        </Select>
      </FormGroup>

      <FormGroup
        controlId="firstName"
        label="First Name"
        error={errors?.firstName?.message}
      >
        <TextInput
          id="firstName"
          name="firstName"
          type="text"
          dataTestId="aboutFirstName"
          ref={register}
          width={45}
        />
      </FormGroup>

      <FormGroup
        controlId="lastName"
        label="Last Name"
        error={errors?.lastName?.message}
      >
        <TextInput
          id="lastName"
          type="text"
          name="lastName"
          dataTestId="aboutLastName"
          ref={register}
          width={45}
        />
      </FormGroup>
      <FormGroup controlId="email" label="Email" error={errors?.email?.message}>
        <TextInput
          id="email"
          type="email"
          name="email"
          dataTestId="aboutEmail"
          ref={register}
          width={35}
        />
      </FormGroup>
      <FormGroup>
        <FormGroup
          controlId="mobile"
          label="Mobile"
          error={errors?.mobile?.message}
        >
          <TextInput
            id="mobile"
            type="tel"
            name="mobile"
            dataTestId="aboutMobile"
            ref={register}
            width={35}
          />
        </FormGroup>
      </FormGroup>
      <FormGroup
        controlId="dayOfBirth"
        label="Date of Birth"
        inline
        error={
          errors?.dayOfBirth?.message ||
          errors?.monthOfBirth?.message ||
          errors?.yearOfBirth?.message
        }
      >
        <Select
          id="dayOfBirth"
          dataTestId="aboutSelectDOB"
          name="dayOfBirth"
          ref={register({
            validate: val => {
              return validationSchema
                .validateAt('dayOfBirth', val)
                .then(() => {
                  clearError(['monthOfBirth', 'yearOfBirth']);
                  return true;
                })
                .catch(e => e.message);
            },
          })}
          placeholder="Day"
        >
          {[...Array(31)]
            .map((_, i) => i + 1)
            .map(value => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
        </Select>
        <Select
          dataTestId="aboutSelectMOB"
          name="monthOfBirth"
          ref={register({
            validate: val => {
              return validationSchema
                .validateAt('monthOfBirth', val)
                .then(() => {
                  clearError(['dayOfBirth', 'yearOfBirth']);
                  return true;
                })
                .catch(e => e.message);
            },
          })}
          placeholder="Month"
        >
          {months.map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
        <Select
          dataTestId="aboutSelectYOB"
          name="yearOfBirth"
          ref={register({
            validate: val => {
              return validationSchema
                .validateAt('yearOfBirth', val)
                .then(() => {
                  clearError(['dayOfBirth', 'monthOfBirth']);
                  return true;
                })
                .catch(e => e.message);
            },
          })}
          placeholder="Year"
        >
          {years.map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
      </FormGroup>
      <FormGroup
        controlId="countryOfBirth"
        label="Country of Birth"
        error={errors?.countryOfBirth?.message}
      >
        <Select
          id="countryOfBirth"
          name="countryOfBirth"
          dataTestId="aboutSelectCOB"
          ref={register}
        >
          <OptionsWithFavourites options={dropdownData.countries} />
        </Select>
      </FormGroup>
      <FormGroup
        controlId="nationality"
        label="Nationality"
        error={errors?.nationality?.message}
      >
        <Select
          id="nationality"
          name="nationality"
          dataTestId="aboutNationality"
          ref={register}
        >
          <OptionsWithFavourites options={dropdownData.nationalities} />
        </Select>
      </FormGroup>
      <FormGroup
        controlId="maritalStatus"
        label="Marital Status"
        error={errors?.maritalStatus?.message}
      >
        <Select
          id="maritalStatus"
          name="maritalStatus"
          dataTestId="aboutMaritalStatus"
          ref={register}
        >
          {dropdownData?.maritalStatuses?.data.map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
      </FormGroup>
      <FormGroup
        controlId="dependants"
        label="No. of Dependants"
        error={errors?.dependants?.message}
      >
        <Select
          id="dependants"
          name="dependants"
          dataTestId="aboutDependants"
          ref={register}
        >
          {dropdownData?.noOfDependants?.data.map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
      </FormGroup>
      <FormGroup
        controlId="adultsInHousehold"
        label="No. of Adults in Household"
        error={errors?.adultsInHousehold?.message}
      >
        <Select
          id="adultsInHousehold"
          name="adultsInHousehold"
          dataTestId="aboutAdultsInHouse"
          ref={register}
        >
          {dropdownData?.noOfAdultsInHousehold?.data.map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
      </FormGroup>
      <FormGroup label="Please Confirm" error={errors?.termsAndCons?.message}>
        <CheckBox
          id="consent"
          dataTestId="aboutConsent"
          name="consent"
          label="I wish to receive emails and SMS messages for updates on the latest deals, offers and promotions."
          ref={register}
        />
        <CheckBox
          id="termsAndCons"
          dataTestId="aboutTermsAndCons"
          name="termsAndCons"
          label="I agree to the terms and conditions."
          ref={register}
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

AboutForm.fragments = {
  dropdownData: gql`
    fragment AboutFormDropdownData on DropDownType {
      __typename
      titles {
        __typename
        data
        favourites
      }
      countries {
        __typename
        data
        favourites
      }
      nationalities {
        __typename
        data
        favourites
      }
      maritalStatuses {
        __typename
        data
      }
      noOfDependants {
        __typename
        data
      }
      noOfAdultsInHousehold {
        __typename
        data
      }
      propertyStatuses {
        __typename
        data
      }
      employmentStatuses {
        __typename
        data
      }
    }
  `,
};

export default AboutForm;
