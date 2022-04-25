import { storiesOf } from '@storybook/react';
import base from 'paths.macro';
import React, { useState } from 'react';
import Select from '.';
import { atomicDir } from '../../../helpers/atomicDirUtils';
import Formgroup from '../../molecules/formgroup';

storiesOf(`${atomicDir(base)}/Select`, module)
  .add('Simple (uncontrolled)', () => (
    <Select>
      <option value="Detached">Detached</option>
      <option value="Semi-detached">Semi-detached</option>
      <option value="Terraced">Terraced</option>
      <option value="Townhouse">Townhouse</option>
    </Select>
  ))
  .add('Simple (controlled)', () => {
    const [value, setValue] = useState('');
    return (
      <Select value={value} onChange={event => setValue(event.target.value)}>
        <option value="Detached">Detached</option>
        <option value="Semi-detached">Semi-detached</option>
        <option value="Terraced">Terraced</option>
        <option value="Townhouse">Townhouse</option>
      </Select>
    );
  })
  .add('Simple with default value (uncontrolled)', () => (
    <Select defaultValue="Terraced">
      <option value="Detached">Detached</option>
      <option value="Semi-detached">Semi-detached</option>
      <option value="Terraced">Terraced</option>
      <option value="Townhouse">Townhouse</option>
    </Select>
  ))
  .add('With favourites', () => (
    <Select>
      <option value="Detached">Detached</option>
      <option disabled>---</option>
      <option value="Semi-detached">Semi-detached</option>
      <option value="Terraced">Terraced</option>
      <option value="Townhouse">Townhouse</option>
    </Select>
  ))
  .add('With groups', () => (
    <Select>
      <optgroup label="Group 1">
        <option value="Detached">Detached</option>
        <option value="Semi-detached">Semi-detached</option>
        <option value="Terraced">Terraced</option>
        <option value="Townhouse">Townhouse</option>
      </optgroup>
      <optgroup label="Group 2">
        <option value="Detached">Detached</option>
        <option value="Semi-detached">Semi-detached</option>
        <option value="Terraced">Terraced</option>
        <option value="Townhouse">Townhouse</option>
      </optgroup>
    </Select>
  ))
  .add('Inline', () => (
    <Formgroup inline label="Inline Select Group">
      <Select placeholder="Day">
        <option value="01">01</option>
        <option value="02">02</option>
        <option value="03">03</option>
      </Select>
      <Select placeholder="Month">
        <option value="01">01</option>
        <option value="02">02</option>
        <option value="03">03</option>
      </Select>
      <Select placeholder="Year">
        <option value="1996">1996</option>
        <option value="1997">1997</option>
        <option value="1998">1998</option>
      </Select>
    </Formgroup>
  ))
  .add('Disabled', () => (
    <Select disabled>
      <option value="Detached">Detached</option>
      <option value="Semi-detached">Semi-detached</option>
      <option value="Terraced">Terraced</option>
      <option value="Townhouse">Townhouse</option>
    </Select>
  ))
  .add('Invalid', () => (
    <Select invalid>
      <option value="Detached">Detached</option>
      <option value="Semi-detached">Semi-detached</option>
      <option value="Terraced">Terraced</option>
      <option value="Townhouse">Townhouse</option>
    </Select>
  ))
  .add('Invalid group', () => (
    <Formgroup
      inline
      label="Invalid Select Group"
      error="Please select a month
    "
    >
      <Select placeholder="Day">
        <option value="01">01</option>
        <option value="02">02</option>
        <option value="03">03</option>
      </Select>
      <Select placeholder="Month">
        <option value="01">01</option>
        <option value="02">02</option>
        <option value="03">03</option>
      </Select>
      <Select placeholder="Year">
        <option value="1996">1996</option>
        <option value="1997">1997</option>
        <option value="1998">1998</option>
      </Select>
    </Formgroup>
  ));
