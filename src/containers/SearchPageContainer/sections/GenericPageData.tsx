import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import SearchPageMarkdown from '../components/SearchPageMarkdown';
import Skeleton from '../../../components/Skeleton';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={2} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

interface IGenericPageData {
  title: string | null;
  body: string;
}

const GenericPageData: FC<IGenericPageData> = ({ title, body }) => (
  <div className="row:text">
    <Heading tag="h2" size="large" color="black" className="-mb-300">
      {title}
    </Heading>
    <Text color="darker" size="regular" tag="div">
      <SearchPageMarkdown markdown={body} />
    </Text>
  </div>
);

export default GenericPageData;
