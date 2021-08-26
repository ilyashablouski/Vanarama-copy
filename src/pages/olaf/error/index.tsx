import { NextPage } from 'next';
import ErrorPage from '../../_error';

const HEADING = 'Thanks For Your Order';
const DESCRIPTION =
  'I’m afraid we can’t take you back, but if you’d like to get in touch or if there’s anything\nwe can help with, simply use the button below for ways to reach us.';
const LINK = {
  href: '/contact-us',
  label: 'Contact Us',
};

const OlafErrorPage: NextPage = () => (
  <ErrorPage heading={HEADING} description={DESCRIPTION} redirectLink={LINK} />
);

export default OlafErrorPage;
