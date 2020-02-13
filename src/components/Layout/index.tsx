import { Grid, Box } from 'react-raster';

import Head from "../Head"

import '@vanarama/uibook/packages/ui-components/src/atomic/style.scss';

import Router from 'next/router';

const handleRouteChange = url => {
    console.log(`App is changing to :: ${url}`)
}
Router.events.on('routeChangeStart', handleRouteChange)

export default ({ children, title = "Vanarama" }) => (
  <>
    <Head title={title} />

    <Grid
      breakpoints={[0, 432, 768, 1024, 1200, 1400]}
      colspan={12}
      control={process.env.NODE_ENV !== "production"}
    >
        { children }
    </Grid>
  </>
);

