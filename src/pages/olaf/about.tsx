import { useRouter } from 'next/router';
import Link from 'next/link';

import Layout from '../../components/Layout';

const AboutPage = () => {

  return (
    <Layout title={`About You`}>

      <h1>About You</h1>


      <hr/>

      <Link href='/olaf/address_history'>
        <a>Next</a>
      </Link>

    </Layout>
  )




}


export default AboutPage;
