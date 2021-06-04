import React from 'react';
import base from 'paths.macro';
import { storiesOf } from '@storybook/react';

import Modal from '.';
import { atomicDir } from '../../../helpers/atomicDirUtils';
import Button from '../../atoms/button';

storiesOf(`${atomicDir(base)}/Modal`, module).add('Default', () => {
  const [isShowing, setIsShowing] = React.useState(true);
  return (
    <div>
      <Modal
        title="The Maintenance Package Covers:"
        text="Servicing, MOTs, tyres, brakes, wipes and bulbs. All you need to worry about is insurance and fuel!"
        show={isShowing}
        onRequestClose={() => setIsShowing(false)}
        additionalText="PS: Without the package you’ll have to deal with the MOTs, servicing
        and replacements for your new vehicle, for the duration of your lease."
      >
        <Button
          className="-mt-200"
          color="teal"
          onClick={() => setIsShowing(false)}
          label="Okay"
        />
      </Modal>
    </div>
  );
});
