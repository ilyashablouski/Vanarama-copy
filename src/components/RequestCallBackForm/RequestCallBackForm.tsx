import Form from '@vanarama/uibook/lib/components/organisms/form';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import TextInput from '@vanarama/uibook/lib/components/atoms/textinput';
import NumericInput from '@vanarama/uibook/lib/components/atoms/numeric-input';
import Checkbox from '@vanarama/uibook/lib/components/atoms/checkbox';

import InputTypes from '../../models/enum/InputTypes';
import config, { IControl } from './config';

const renderInput = (control: IControl) => {
  switch (control.type) {
    case InputTypes.text: {
      return <TextInput name={control.name} dataTestId={control.dataTestId} />;
    }
    case InputTypes.numeric: {
      return (
        <NumericInput
          type="number"
          name={control.name}
          dataTestId={control.dataTestId}
        />
      );
    }
    case InputTypes.checkbox: {
      return (
        <Checkbox
          id={control.name}
          name={control.name}
          dataTestId={control.dataTestId}
          label={control.label}
        />
      );
    }
    default: {
      return null;
    }
  }
};

const renderFields = () =>
  config.controls.map(control => (
    <Formgroup
      controlId={control.controlId}
      label={control.type === InputTypes.checkbox ? undefined : control.label}
      key={control.controlId}
    >
      {renderInput(control)}
    </Formgroup>
  ));

const RequestCallBackForm = () => (
  <Card className="hero-card">
    <div className="hero-card--inner">
      <Heading size="lead">{config.title.label}</Heading>
      <Form
        dataTestId="fleet-request-call-back-form"
        id="fleet-request-call-back-form"
      >
        {renderFields()}
        <Button
          color="primary"
          dataTestId="fleet_continue"
          label={config.requestCallBackButton.label}
          size="large"
          type="submit"
          className="-fullwidth"
        />
      </Form>
    </div>
  </Card>
);

export default RequestCallBackForm;
