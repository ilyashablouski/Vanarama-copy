import { useRouter } from 'next/router';
import Link from 'next/link';
import { Box } from 'react-raster';

import Layout from '../../components/Layout';

const AddressHistoryPage = () => {

  return (
    <Layout title={`Address History`}>

      <Box>
        <h1>Address History</h1>

        <Link href='/olaf/employment_history'>
          <a>Next</a>
        </Link>
      </Box>

    </Layout>
  )




}


export default AddressHistoryPage;
