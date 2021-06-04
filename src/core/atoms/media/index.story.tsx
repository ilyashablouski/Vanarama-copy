import React from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import Media from './Media';

storiesOf(`${atomicDir(base)}/Media`, module)
  .add('Vimeo | controls', () => (
    <Media
      src="https://ssl.caranddriving.com/cdwebsite/player.aspx?id=8221&cid=autorama&responsive=true"
      vimeoConfig={{ color: 'EC6408', portrait: false }}
    />
  ))
  .add('Vimeo | auto | no controls', () => (
    <Media
      src="https://player.vimeo.com/video/263419265"
      controls={false}
      loop
      playing
    />
  ))
  .add('Vimeo | responsive', () => (
    <div>
      <div style={{ position: 'relative', height: '200px' }}>
        <Media
          src="http://www.caranddriving.com/new/player.jsp?w=450&id=8244&cid=autorama"
          width="100%"
          height="100%"
          responsive
        />
      </div>
      <div style={{ position: 'relative', height: '200px' }}>
        <Media
          src="//fast.wistia.net/embed/iframe/g8djytx6z3"
          width="100%"
          height="100%"
          responsive
        />
      </div>
      <div style={{ position: 'relative', height: '200px' }}>
        <Media
          src="https://ssl.caranddriving.com/cdwebsite/player.aspx?id=8221&cid=autorama&responsive=true"
          width="100%"
          height="100%"
          responsive
        />
      </div>
    </div>
  ));
