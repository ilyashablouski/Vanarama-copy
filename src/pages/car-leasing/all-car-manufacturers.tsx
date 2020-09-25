import { NextPage, NextPageContext } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import withApollo from '../../hocs/withApollo';
import SearchPageContainer from '../../containers/SearchPageContainer';

interface IProps {
  isServer: boolean;
}

const Page: NextPage<IProps> = ({ isServer }) => {
  return <SearchPageContainer isServer={isServer} isCarSearch isAllMakesPage />;
};
export async function getServerSideProps({ query, req }: NextPageContext) {
  return { props: { query, isServer: !!req } };
}

export default withApollo(Page, { getDataFromTree });
