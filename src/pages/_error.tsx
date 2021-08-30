import dynamic from 'next/dynamic';

import Heading from 'core/atoms/heading';
import { ILinkProps } from '../components/RouterLink/interface';
import { IClassNamesProps } from '../models/IClassNamesProps';

const Text = dynamic(() => import('core/atoms/text'));
const RouterLink = dynamic(() => import('../components/RouterLink/RouterLink'));

interface IErrorPageProps {
  heading?: string;
  description?: string;
  redirectLink?: ILinkProps;
}

const DEFAULT_LINK_CLASSNAMES: IClassNamesProps = {
  color: 'teal',
  solid: true,
  size: 'regular',
};
const DEFAULT_LINK = {
  label: 'Home',
  href: '/',
};
const DEFAULT_HEADING = 'Oops, Something Went Wrong';
const DEFAULT_DESCRIPTION =
  'We’re having a few technical issues which we’re working on to resolveASAP!\nPlease try refreshing the page or try again later.';

const Error = ({ heading, description, redirectLink }: IErrorPageProps) => {
  return (
    <section className="error">
      <Heading size="xlarge" color="orange" tag="h1">
        {heading || DEFAULT_HEADING}
      </Heading>
      <br />
      <Text
        tag="p"
        size="large"
        color="primary"
        className="-mt-400 error--description"
      >
        {description || DEFAULT_DESCRIPTION}
      </Text>
      <br />
      <RouterLink
        className="button"
        classNames={DEFAULT_LINK_CLASSNAMES}
        link={redirectLink || DEFAULT_LINK}
        withoutDefaultClassName
        dataTestId="view-all-vans"
      >
        <div className="button--inner">
          {redirectLink?.label || DEFAULT_LINK.label}
        </div>
      </RouterLink>
    </section>
  );
};

// TODO: https://autorama.atlassian.net/browse/DIG-5611
export default Error;
