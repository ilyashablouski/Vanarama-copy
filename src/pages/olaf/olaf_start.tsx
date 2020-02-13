import Header from "../../partials/header"

import Link from 'next/link';

import Layout from '../../components/Layout';

const StartPage = () => {

  return (
    <Layout title={`Olaf Start`}>

      <h1>Olaf Start Page</h1>


      <hr/>

      <Link href='/olaf/about'>
        <a>Next</a>
      </Link>

    </Layout>
  )
}
export default StartPage;
