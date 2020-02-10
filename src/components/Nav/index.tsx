import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import './styles.scss';

const Nav = () => {
  const router = useRouter();
  useEffect(() => {
    router.prefetch('/test');
  });
  return (
    <nav className="nav-elements">
      <Link href="tel:+01442 507665">
        <a>01442 507665</a>
      </Link>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/test">
        <a>Test</a>
      </Link>
      <Link href="/sub/test">
        <a>Sub Test</a>
      </Link>
    </nav>
  );
};

export default Nav;
