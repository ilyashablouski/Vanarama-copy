import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import TextInput from '@vanarama/uibook/lib/components/atoms/textinput';
import NumericInput from '@vanarama/uibook/lib/components/atoms/numeric-input';
import Checkbox from '@vanarama/uibook/lib/components/atoms/checkbox';
import config from './config';

const RequestCallBackFormFields = () => (
  <>
    <Formgroup controlId="full-name" label={config.fullname}>
      <TextInput id="full-name" name="full-name" dataTestId="fleet_full-name" />
    </Formgroup>

    <Formgroup controlId="company-name" label={config.companyName}>
      <TextInput
        id="company-name"
        name="company-name"
        dataTestId="fleet_company-name"
      />
    </Formgroup>

    <Formgroup controlId="fleet-size" label={config.fleetSize}>
      <NumericInput
        type="number"
        id="fleet-size"
        name="fleet-size"
        dataTestId="fleet_fleet-size"
      />
    </Formgroup>

    <Formgroup controlId="email-address" label={config.emailAddress}>
      <TextInput
        id="email-address"
        name="email-address"
        dataTestId="fleet_email-address"
      />
    </Formgroup>

    <Formgroup controlId="phone-number" label={config.phoneNumber}>
      <TextInput
        id="phone-number"
        name="phone-number"
        dataTestId="fleet_phone-number"
      />
    </Formgroup>

    <Formgroup>
      <Checkbox
        dataTestId="fleet_agreement"
        id="agreement"
        name="agreement"
        label={config.agreement}
        // ref={register}
      />
    </Formgroup>
  </>
);

export default RequestCallBackFormFields;
