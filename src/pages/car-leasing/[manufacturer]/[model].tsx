import { NextPage } from 'next';

import { useRouter } from 'next/router';

const Page: NextPage = () => {
  const router = useRouter();
  const { manufacturer, model } = router.query;

  return (
    <>
      <p>Manufactuter: {manufacturer}</p>
      <p>Model: {model}</p>
    </>
  );
};

Page.getInitialProps = ({ query }) => {
  return { query };
};

export default Page;
