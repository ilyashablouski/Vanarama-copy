import { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <>
      <p>Van Leasing</p>
    </>
  );
};

Page.getInitialProps = ({ query }) => {
  return { query };
};

export default Page;
