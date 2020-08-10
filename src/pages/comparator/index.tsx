import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import Breadcrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import withApollo from '../../hocs/withApollo';
import ComparatorContainer from '../../containers/ComparatorContainer/ComparatorContainer';

const Comparator: NextPage = () => {
  const breadcrumbProps = {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Eligibility Checker', href: '/eligibility-checker' },
      { label: 'Enter Details', href: '/eligibility-checker/details' },
    ],
  };

  return (
    <>
      <div className="row:title">
        <Breadcrumb items={breadcrumbProps.items} />
        <Heading size="xlarge" color="black">
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
