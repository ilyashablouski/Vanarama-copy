import { NextPage } from 'next';
import withApollo from '../../../../hocs/withApollo';
import SearchPageContainer from '../../../../containers/SearchPageContainer';

interface IProps {
  isServer: boolean;
}

const Page: NextPage<IProps> = ({ isServer }) => {
  return <SearchPageContainer isServer={isServer} isCarSearch isRangePage />;
};
Page.getInitialProps = ({ query, req }) => {
  return { query, isServer: !!req };
};

export default withApollo(Page);
