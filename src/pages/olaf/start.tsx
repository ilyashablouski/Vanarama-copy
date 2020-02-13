import Link from 'next/link';
import { Box } from 'react-raster';

import Layout from '../../components/Layout';

const StartPage = () => {

  return (
    <Layout title={`Olaf Start`}>

      <Box>

        <h1>Olaf Start Page</h1>


        <Link href='/olaf/about'>
          <a>Start</a>
        </Link>

      </Box>

    </Layout>
  )
}
export default StartPage;
