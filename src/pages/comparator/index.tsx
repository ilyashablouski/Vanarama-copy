import dynamic from 'next/dynamic';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { getDataFromTree } from '@apollo/react-ssr';
import withApollo from '../../hocs/withApollo';
import ComparatorContainer from '../../containers/ComparatorContainer/ComparatorContainer';
import Skeleton from '../../components/Skeleton';
import Head from '../../components/Head/Head';
import RouterLink from '../../components/RouterLink/RouterLink';

const ChevronBack = dynamic(() => import('core/assets/icons/ChevronBack'), {
  loading: () => <Skeleton count={1} />,
  ssr: true,
});
const Icon = dynamic(() => import('core/atoms/icon/'), {
  loading: () => <Skeleton count={1} />,
});
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});

const Comparator: NextPage = () => {
  const router = useRouter();
  const metaData = {
    title: `Compare Vehicles | Vanarama` || null,
    name: '' || null,
    metaRobots: '' || null,
    metaDescription:
      `Compare Vehicles at Vanarama. ✅ 5* Customer Service ✅ Brand-New ✅ Free Delivery ✅ Road Tax Included` ||
      null,
    publishedOn: '' || null,
    legacyUrl: '' || null,
    pageType: '' || null,
    canonicalUrl: '' || null,
    slug: '' || null,
    schema: null,
    breadcrumbs: null,
  };

  return (
    <>
      <div className="row:title">
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item -parent">
              <RouterLink
                classNames={{ color: 'teal', size: 'small' }}
                link={{ label: '', href: '' }}
                onClick={() => router.back()}
              >
                <Icon icon={<ChevronBack />} color="teal" />
                Back to Search Results
              </RouterLink>
            </li>
          </ol>
        </nav>
        <Heading size="xlarge" color="black" tag="h1">
          Compare Vehicles
        </Heading>
      </div>
      <div className="row:comparator-tool">
        <ComparatorContainer />
      </div>
      <Head metaData={metaData} featuredImage={null} />
    </>
  );
};

export default withApollo(Comparator, { getDataFromTree });
