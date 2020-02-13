import { useRouter } from 'next/router';
import Link from 'next/link';

import Layout from '../../components/Layout';

const EmploymentHistoryPage = () => {

  return (
    <Layout title={`Employment History`}>

      <h1>Employment History</h1>


      <hr/>

      <Link href='/olaf/expenses'>
        <a>Next</a>
      </Link>

    </Layout>
  )




}


export default EmploymentHistoryPage;
