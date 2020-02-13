import { useRouter } from 'next/router';
import Link from 'next/link';

import Layout from '../../components/Layout';

const AddressHistoryPage = () => {

  return (
    <Layout title={`Address History`}>

      <h1>Address History</h1>


      <hr/>

      <Link href='/olaf/employment_history'>
        <a>Next</a>
      </Link>

    </Layout>
  )




}


export default AddressHistoryPage;
