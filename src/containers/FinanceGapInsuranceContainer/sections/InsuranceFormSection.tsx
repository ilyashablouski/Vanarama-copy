import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import ReactMarkdown from 'react-markdown';
import GoldrushForm from '../../../components/GoldrushForm/GoldrushForm';
import { IGoldrushFromValues } from '../../../components/GoldrushForm/interfaces';

interface IProps {
  title: string | null;
  body: string | null;
  isSubmitting: boolean;
  onSubmit: (variables: IGoldrushFromValues) => void;
}

const InsuranceFormSection = ({
  title,
  body,
  isSubmitting,
  onSubmit,
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
        <GoldrushForm
          callBack={false}
          isSubmitting={isSubmitting}
          isPostcodeVisible
          isTextInVisible
          noTermsAndConditions
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default InsuranceFormSection;
