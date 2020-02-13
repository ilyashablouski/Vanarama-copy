import { useRouter } from 'next/router';
import Link from 'next/link';
import { Box } from 'react-raster';

import Layout from '../../components/Layout';

const AboutPage = () => {

  return (
    <Layout title={`About You`}>

      <Box>
        <h1>About You</h1>

        <Link href='/olaf/address_history'>
          <a>Next</a>
        </Link>
      </Box>

    </Layout>
  )




}


export default AboutPage;
