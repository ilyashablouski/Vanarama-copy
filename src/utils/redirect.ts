import { ServerResponse } from 'http';
import Router from 'next/router';

import { isResponseSent } from './url';

// eslint-disable-next-line import/prefer-default-export
export function redirect(params: {
  location: string;
  statusCode?: number;
  res?: ServerResponse;
}) {
  if (params.res && !isResponseSent(params.res)) {
    params.res.writeHead(params.statusCode ?? 302, {
      Location: params.location,
      'Content-Type': 'text/html; charset=utf-8',
    });
    params.res.end();
  } else {
    Router.replace(params.location);
  }
}
