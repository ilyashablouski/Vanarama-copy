import React from 'react';
import dynamic from 'next/dynamic';
import getTitleTag from '../../../utils/getTitleTag';
import { GenericPageQuery_genericPage_sections_leadText as ILeadText } from '../../../../generated/GenericPageQuery';
import Skeleton from '../../../components/Skeleton';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

const LeadTextSection = ({ titleTag, heading, description }: ILeadText) => (
  <div className="row:lead-text">
    <Heading
      size="xlarge"
      color="black"
      tag={getTitleTag(titleTag) as keyof JSX.IntrinsicElements}
    >
      {heading}
    </Heading>
    <Text size="lead" color="darker">
      {description}
    </Text>
  </div>
);

export default React.memo(LeadTextSection);
