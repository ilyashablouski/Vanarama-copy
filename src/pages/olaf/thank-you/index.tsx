import { Column, Grid } from '@vanarama/uibook/lib/components/molecules/grid';
import { NextPage } from 'next';
import React from 'react';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import { useRouter } from 'next/router';

const ThankYouPage: NextPage = () => {
  const router = useRouter();
  // NOTE: This is just a temporary placeholder for the demo
  return (
    <section className="section">
      <div className="container">
        <Grid lg="6" md="2" sm="2">
          <Column md="2" sm="2" lg="1-3">
            <form className="form">
              <h1 className="heading -xlarge -black">That&apos;s All Done!</h1>
              <span className="heading -success -regular">Vehicle Ordered</span>
              <p className="text -darker">
                Your application is on its way to the lease company. It may be
                as quick as 1 or 2 hours that you hear from us, but it could
                take up to 24 business hours.
              </p>
              <Button
                color="teal"
                label="Back to homepage"
                onClick={() => router.push('/')}
              />
            </form>
          </Column>
        </Grid>
      </div>
    </section>
  );
};

export default ThankYouPage;
