import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import ReactMarkdown from 'react-markdown';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import GoldrushForm from '../../../components/GoldrushForm/GoldrushForm';
import { IGoldrushFromValues } from '../../../components/GoldrushForm/interfaces';

interface IProps {
  title: string | null;
  body: string | null;
  isSubmitting: boolean;
  isGratitudeVisible: boolean;
  onSubmit: (variables: IGoldrushFromValues) => void;
  onCompleted: () => void;
}

const InsuranceFormSection = ({
  title,
  body,
  isSubmitting,
  onSubmit,
  isGratitudeVisible,
  onCompleted,
}: IProps) => {
  return (
    <div className="row:featured-left">
      <div>
        <Heading size="large" color="black">
          {title || ''}
        </Heading>
        <ReactMarkdown escapeHtml={false} source={body || ''} />
      </div>
      <div className="card">
        {isGratitudeVisible ? (
          <>
            <Heading size="regular" color="black">
              Thank you for submitting the form. We will be in touch shortly.
            </Heading>
            <Button
              className="-mt-600"
              dataTestId="goldrush-button_close"
              label="Close"
              size="lead"
              fill="solid"
              color="teal"
              onClick={onCompleted}
            />
          </>
        ) : (
          <GoldrushForm
            callBack={false}
            isSubmitting={isSubmitting}
            isPostcodeVisible
            isTextInVisible
            onSubmit={onSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default InsuranceFormSection;
