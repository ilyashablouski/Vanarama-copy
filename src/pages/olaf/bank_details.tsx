import { useRouter } from 'next/router';
import Link from 'next/link';
import { Box } from 'react-raster';

import Layout from '../../components/Layout';

const BankDetailsPage = () => {

  return (
    <Layout title={`Bank Details`}>

      <Box>
        <h1>Bank Details</h1>


        <Link href='/olaf/summary'>
          <a>Next</a>
        </Link>
      </Box>

    </Layout>
  )
}
export default BankDetailsPage;
