import React from 'react';
import decode from 'decode-html';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import css from '!!raw-loader!../../../public/styles/base.css';

const Deferred = () => (
  // eslint-disable-next-line react/no-danger
  <style dangerouslySetInnerHTML={{ __html: decode(css) }} />
);

export default React.memo(Deferred);
