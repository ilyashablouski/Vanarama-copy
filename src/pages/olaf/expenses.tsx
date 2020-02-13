import { useRouter } from 'next/router';
import Link from 'next/link';

import Layout from '../../components/Layout';

const ExpensesPage = () => {

  return (
    <Layout title={`Expenses`}>

      <h1>Expenses</h1>


      <hr/>

      <Link href='/olaf/summary'>
        <a>Next</a>
      </Link>

    </Layout>
  )




}


export default ExpensesPage;
