import React from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';
import { atomicDir } from '../../../../helpers/atomicDirUtils';
import './storybook.scss';

const req = require.context('./', false, /\.tsx$/);
const stories = storiesOf(`${atomicDir(base)}/Custom`, module);

req.keys().forEach(filename => {
  if (filename === './index.story.tsx') {
    return;
  }
  const name = filename.replace(/(\.\/|\.tsx)/g, '');
  const Svg = req(filename).default;
  stories.add(name, () => <Svg />);
});
