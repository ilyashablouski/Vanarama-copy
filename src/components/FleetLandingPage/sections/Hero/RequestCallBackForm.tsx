import Form from "@vanarama/uibook/lib/components/organisms/form";
import Heading from "@vanarama/uibook/lib/components/atoms/heading";
import Card from "@vanarama/uibook/lib/components/molecules/cards";
import config from "../../config";
import Button from "@vanarama/uibook/lib/components/atoms/button";
import RequestCallBackFormFields from "./RequestCallBackFormFields";

const RequestCallBackForm = () => (
    <Card className="hero-card" >
        <div className="hero-card--inner">
            <Heading size="lead">{config.requestCallBackForm.title}</Heading>
            <Form id="fleet-request-call-back-form">
                <RequestCallBackFormFields />
                <Button
                    color="primary"
                    dataTestId="fleet_continue"
                    label={config.requestCallBackForm.requestCallBackButton}
                    // label={formState.isSubmitting ? 'Saving...' : 'Continue'}
                    size="large"
                    type="submit"
                    className="-fullwidth"
                />
            </Form>
        </div>
    </Card>
);

export default RequestCallBackForm;