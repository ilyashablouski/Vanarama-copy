import Link from "next/link";
import { Box } from 'react-raster';
import Layout from "../../components/Layout";
import React from "react";


const OlafIndexPage = () => {

  return (
    <Layout title={`Olaf Start`}>

      <Box>

        <h1>Olaf Start</h1>

        <div>
          <h1>Verify Your Identity</h1>
          <button id="olaf-verify-identity-button">VERIFY YOUR IDENTITY</button>
        </div>

        <Link href='olaf/start'>
          <a>Complete Application</a>
        </Link>

      </Box>

    </Layout>
  )

}

export default OlafIndexPage
