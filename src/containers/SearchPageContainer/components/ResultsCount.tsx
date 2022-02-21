import { FC } from 'react';
import dynamic from 'next/dynamic';
import Skeleton from '../../../components/Skeleton';

interface IResultsCuntProps {
  dataUiTestId: string;
  totalCount: number;
}

const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

const ResultsCount: FC<IResultsCuntProps> = ({ dataUiTestId, totalCount }) => (
  <Text
    color="darker"
    size="regular"
    tag="span"
    dataUiTestId={`${dataUiTestId}_text_results-count`}
  >
    {`Showing ${totalCount} Results`}
  </Text>
);

export default ResultsCount;
