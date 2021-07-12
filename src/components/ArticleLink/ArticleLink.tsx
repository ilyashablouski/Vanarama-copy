import React from 'react';

import Link from 'core/atoms/link';
import RouterLink from '../RouterLink';

import { ILink } from './interface';

function ArticleLink({ href, children }: ILink) {
  return /^#/.test(href) ? (
    <Link href={href}>{children}</Link>
  ) : (
    <RouterLink
      link={{ href, label: children }}
      classNames={{ color: 'teal' }}
    />
  );
}

export default ArticleLink;
