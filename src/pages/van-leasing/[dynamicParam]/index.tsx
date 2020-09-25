import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  bodyUrls,
  isTransmission,
  getBodyStyleForCms,
} from '../../../containers/SearchPageContainer/helpers';
import SearchPageContainer from '../../../containers/SearchPageContainer';
import withApollo from '../../../hocs/withApollo';

interface IPageType {
  isBodyStylePage: boolean;
  isTransmissionPage: boolean;
  isMakePage: boolean;
}

interface IProps {
  isServer: boolean;
  pageType: IPageType;
  query: any;
}

const Page: NextPage<IProps> = ({ isServer, query, pageType }) => {
  const router = useRouter();
  useEffect(() => {
    // copy dynamic param for actual filter query
    if (
      (pageType.isMakePage && !router.query.make) ||
      (pageType.isBodyStylePage && !router.query.bodyStyles) ||
      (pageType.isTransmissionPage && !router.query.transmissions)
    ) {
      const { pathname, asPath } = router;
      router.replace(
        {
          pathname,
          query,
        },
        asPath,
        { shallow: true },
      );
    }
    // it's should executed only when page init
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SearchPageContainer
      isServer={isServer}
      isCarSearch={false}
      isMakePage={pageType.isMakePage}
      isBodyStylePage={pageType.isBodyStylePage}
      isTransmissionPage={pageType.isTransmissionPage}
    />
  );
};

export async function getServerSideProps({ query, req }: NextPageContext) {
  const newQuery = { ...query };
  // check for bodystyle page
  const isBodyStylePage = !!bodyUrls.find(
    getBodyStyleForCms,
    (query.dynamicParam as string).toLowerCase(),
  );
  // check for transmissons page
  const isTransmissionPage = isTransmission(query.dynamicParam as string);
  const pageType = {
    isBodyStylePage,
    isTransmissionPage,
    isMakePage: !(isBodyStylePage || isTransmissionPage),
  };
  if (isBodyStylePage)
    newQuery.bodyStyles = (query.dynamicParam as string).replace('-', ' ');
  else if (isTransmissionPage)
    newQuery.transmissions = (query.dynamicParam as string).replace('-', ' ');
  else newQuery.make = query.dynamicParam;

  return { props: { query: { ...newQuery }, isServer: !!req, pageType } };
}

export default withApollo(Page);
