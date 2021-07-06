import dynamic from 'next/dynamic';

import Heading from 'core/atoms/heading';

const Text = dynamic(() => import('core/atoms/text'));
const RouterLink = dynamic(() => import('../components/RouterLink/RouterLink'));

const Error = () => {
  return (
    <section className="error">
      <Heading size="xlarge" color="orange" tag="h1">
        Oops, Something Went Wrong
      </Heading>
      <br />
      <Text tag="p" size="regular" color="primary" className="-mt-400">
        We’re having a few technical issues which we’re working on to resolve
        ASAP!
      </Text>
      <Text tag="p" size="regular" color="primary" className="-mb-400">
        Please try refreshing the page or try again later.
      </Text>
      <br />
      <RouterLink
        className="button"
        classNames={{
          color: 'teal',
          solid: true,
          size: 'regular',
        }}
        link={{
          label: 'Home',
          href: '/',
        }}
        withoutDefaultClassName
        dataTestId="view-all-vans"
      >
        <div className="button--inner">Home</div>
      </RouterLink>
    </section>
  );
};

// TODO: https://autorama.atlassian.net/browse/DIG-5611
export default Error;
