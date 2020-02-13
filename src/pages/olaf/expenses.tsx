import { useRouter } from 'next/router';
import Link from 'next/link';
import { Box } from 'react-raster';
import Layout from '../../components/Layout';

const ExpensesPage = () => {

  return (
    <Layout title={`Expenses`}>

      <Box>
        <h1>Expenses</h1>

        <Link href='/olaf/summary'>
          <a>Next</a>
        </Link>
      </Box>

    </Layout>
  )




}


export default ExpensesPage;
