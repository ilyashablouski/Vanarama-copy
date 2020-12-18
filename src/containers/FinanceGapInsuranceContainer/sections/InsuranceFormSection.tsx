import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import { IGoldrushFromValues } from '../../../components/GoldrushForm/interfaces';
import Skeleton from '../../../components/Skeleton';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const GoldrushForm = dynamic(
  () => import('../../../components/GoldrushForm/GoldrushForm'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

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
        <ReactMarkdown allowDangerousHtml source={body || ''} />
      </div>
      <div className="card">
        <GoldrushForm
          callBack
          isSubmitting={isSubmitting}
          isPostcodeVisible
          onSubmit={onSubmit}
          isTextInVisible
        />
      </div>
    </div>
  );
};

export default InsuranceFormSection;
