import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import localforage from 'localforage';

export const loginSuccess = token => {
  cookie.set('token', token, { expires: 1 });
  Router.push('/index');
};

export const auth = ctx => {
  const { token } = nextCookie(ctx);

  if (!token) {
    if (typeof window === 'undefined') {
      ctx.res.writeHead(302, { Location: '/login' });
      ctx.res.end();
    } else {
      Router.push('/login');
    }
  }

  return token;
};

export const logout = () => {
  cookie.remove('token');
  // to support logging out from all windows
  localforage.setItem('logout', Date.now());
  Router.push('/login');
};
