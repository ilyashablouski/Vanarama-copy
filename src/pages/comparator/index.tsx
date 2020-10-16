import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import withApollo from '../../hocs/withApollo';
import ComparatorContainer from '../../containers/ComparatorContainer/ComparatorContainer';

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
