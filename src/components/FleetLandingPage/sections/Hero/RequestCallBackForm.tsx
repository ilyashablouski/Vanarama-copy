import Form from "@vanarama/uibook/lib/components/organisms/form";
import Heading from "@vanarama/uibook/lib/components/atoms/heading";
import Card from "@vanarama/uibook/lib/components/molecules/cards";
import config from "../../config";
import Formgroup from "@vanarama/uibook/lib/components/molecules/formgroup";
import TextInput from "@vanarama/uibook/lib/components/atoms/textinput";
import Checkbox from "@vanarama/uibook/lib/components/atoms/checkbox";
import Button from "@vanarama/uibook/lib/components/atoms/button";

const RequestCallBackForm = () => (
    <Card className="hero-card" >
        <div className="hero-card--inner">
            <Heading size="lead">{config.requestCallBackForm.title}</Heading>

            <Formgroup
                controlId="full-name"
                label={config.requestCallBackForm.fullname} >
                <TextInput
                    id="full-name"
                    name="full-name"
                    dataTestId="fleet_full-name" />
            </Formgroup>

            <Formgroup
                controlId="company-name"
                label={config.requestCallBackForm.companyName} >
                <TextInput
                    id="company-name"
                    name="company-name"
                    dataTestId="fleet_company-name" />
            </Formgroup>

            <Formgroup
                controlId="fleet-size"
                label={config.requestCallBackForm.fleetSize} >
                <TextInput
                    id="fleet-size"
                    name="fleet-size"
                    dataTestId="fleet_fleet-size" />
            </Formgroup>

            <Formgroup
                controlId="email-address"
                label={config.requestCallBackForm.emailAddress}
            >
                <TextInput
                    id="email-address"
                    name="email-address"
                    dataTestId="fleet_email-address"
                />
            </Formgroup>

            <Formgroup
                controlId="phone-number"
                label={config.requestCallBackForm.phoneNumber} >
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
                    label={config.requestCallBackForm.agreement}
                // ref={register}
                />
            </Formgroup>

            <Button
                color="primary"
                dataTestId="fleet_continue"
                label={config.requestCallBackForm.requestCallBackButton}
                // label={formState.isSubmitting ? 'Saving...' : 'Continue'}
                size="large"
                type="submit"
                className="-fullwidth"
            />
        </div>
    </Card>
    // <Form><Heading></Heading></Form>
);

export default RequestCallBackForm;