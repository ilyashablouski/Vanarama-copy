import { Component } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Box } from 'react-raster';
import { connect } from 'react-redux';
import * as olafActions from 'redux/actions/olaf_actions';
import Layout from '../../components/Layout';

interface Props {
  captchaFormData: (pageRef: string, data: {}) => void;
}

export class AboutYou extends Component<Props> {
  render() {
    return (
      <Layout title={'About You'}>
        <Box>
          <div>
            <h1>About You</h1>
            <button id="olaf-verify-identity-button">
              VERIFY YOUR IDENTITY
            </button>
          </div>
          <div>
            <h2>Complete Your Application</h2>
            <Link href="./olaf_start">
              <a className="button-link" id="olaf-complete-application-link">
                Complete Application{' '}
              </a>
            </Link>
          </div>

          <Link href="/olaf/address_history">
            <a>Next</a>
          </Link>
        </Box>
      </Layout>
    );
  }
}

export default connect((state) => state, { ...olafActions })(AboutYou);
