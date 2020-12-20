import dynamic from 'next/dynamic';
import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import withApollo from '../../hocs/withApollo';
import ComparatorContainer from '../../containers/ComparatorContainer/ComparatorContainer';
import Skeleton from '../../components/Skeleton';

const Heading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/heading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const Comparator: NextPage = () => {
  return (
    <>
      <div className="row:title">
        <Heading size="xlarge" color="black" tag="h1">
          Compare Vehicles
        </Heading>
      </div>
      <div className="row:comparator-tool">
        <ComparatorContainer />
      </div>
    </>
  );
};

export default withApollo(Comparator, { getDataFromTree });
