import React from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import Skeleton from '../../../components/Skeleton';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps {
  title: string | null;
  body: string | null;
}

const InsuranceFormSection = ({ title, body }: IProps) => {
  return (
    <div className="row:lead-text">
      <Heading tag="h1" size="large" color="black">
        {title || ''}
      </Heading>
      <ReactMarkdown allowDangerousHtml source={body || ''} />
    </div>
  );
};

export default InsuranceFormSection;
