import InputTypes from '../../models/enum/InputTypes';

export type IControl = {
  controlId: string;
  label: string;
  name: string;
  dataTestId: string;
  type: InputTypes;
};

const config = {
  controls: [
    {
      controlId: 'full-name',
      label: 'Full Name',
      name: 'full-name',
      dataTestId: 'fleet_full-name',
      type: InputTypes.text,
    },
    {
      controlId: 'company-name',
      label: 'Company Name',
      name: 'company-name',
      dataTestId: 'fleet_company-name',
      type: InputTypes.text,
    },
    {
      controlId: 'fleet-size',
      label: 'Fleet Size',
      name: 'fleet-size',
      dataTestId: 'fleet_fleet-size',
      type: InputTypes.numeric,
    },
    {
      controlId: 'email-address',
      label: 'Email Address',
      name: 'email-address',
      dataTestId: 'fleet_email-address',
      type: InputTypes.text,
    },
    {
      controlId: 'phone-number',
      label: 'Phone Number',
      name: 'phone-number',
      dataTestId: 'fleet_phone-number',
      type: InputTypes.text,
    },
    {
      controlId: 'agreement',
      label: 'Marketing preferences agreement',
      name: 'agreement',
      dataTestId: 'fleet_agreement',
      type: InputTypes.checkbox,
    },
  ] as IControl[],
  title: {
    label: 'Schedule A Call With Us',
  },
  requestCallBackButton: {
    label: "I'd Like A Callback",
  },
};

export default config;
