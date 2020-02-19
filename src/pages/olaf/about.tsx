import { Component } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { connect } from 'react-redux';
import * as olafActions from 'redux/actions/olaf_actions';
import '@vanarama/uibook/src/atomic/style.scss';
import Button from '@vanarama/uibook/src/atomic/atoms/Button';
import Header from '@vanarama/uibook/src/atomic/organisms/Header';
import Footer from '@vanarama/uibook/src/atomic/organisms/Footer';

interface Props {
  captchaFormData: (pageRef: string, data: {}) => void;
}

export class AboutYou extends Component<Props> {
  render() {
    return (
      <>
      {/*<Header/>*/}
        <div>
          <h1>About You</h1>
          <span className="Heading__Caption">We just need some initial details for your credit check.</span>
          {/*<Button children="" label="Continue" size="Medium" color="Primary" fill="Solid"></Button>*/}
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
    { /*<Footer />*/ }
      </>
    );
  }
}

export default connect((state) => state, { ...olafActions })(AboutYou);
