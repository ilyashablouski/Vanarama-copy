import { useRouter } from 'next/router';
import Link from 'next/link';
import { Box } from 'react-raster';

import Layout from '../../components/Layout';

const EmploymentHistoryPage = () => {

  return (
    <Layout title={`Employment History`}>

      <Box>
        <h1>Employment History</h1>


        <Link href='/olaf/expenses'>
          <a>Next</a>
        </Link>
      </Box>

    </Layout>
  )




}


export default EmploymentHistoryPage;
