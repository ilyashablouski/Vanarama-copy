import { Grid, Box } from 'react-raster';

import Head from "../Head"

import Header from './Header';
import Footer from './Footer';

import Router from 'next/router';

const handleRouteChange = url => {
    console.log(`App is changing to :: ${url}`)
}
Router.events.on('routeChangeStart', handleRouteChange)



export default ({ children, title = "Vanarama" }) => (
  <>
    <Head title={title} />
    <Header />
    <Grid
      breakpoints={[0, 432, 768, 1024, 1200, 1400]}
      colspan={12}
      control={process.env.NODE_ENV !== "production"}
    >
        { children }
    </Grid>
    <Footer />
  </>
);

