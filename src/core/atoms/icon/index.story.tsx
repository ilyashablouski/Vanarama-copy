import React from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import Icon from '.';
import Star from '../../assets/icons/StarSharp';
import StarHalf from '../../assets/icons/StarHalfSharp';
import StarOutline from '../../assets/icons/StarOutline';
import HammerOutline from '../../assets/icons/HammerOutline';
import SyncCircleOutline from '../../assets/icons/SyncCircleOutline';
import ChevronUpCircle from '../../assets/icons/ChevronUpCircle';

storiesOf(`${atomicDir(base)}/Icon`, module)
  .add('Star', () => (
    <div>
      <Icon icon={<Star />} size="small" color="orange" />
      <Icon icon={<Star />} size="regular" color="sky" />
      <Icon icon={<Star />} size="large" color="black" />
      <Icon icon={<Star />} size="xlarge" color="medium" />
    </div>
  ))
  .add('Star examples [Star stroke, Star fill, StarHalf, StarOutline ]', () => (
    <div>
      <Icon icon={<Star />} size="xlarge" color="teal" />
      <Icon icon={<StarHalf />} size="xlarge" color="teal" />
      <Icon icon={<StarOutline />} size="xlarge" color="teal" />
    </div>
  ))
  .add('HammerOutline', () => (
    <div>
      <Icon icon={<HammerOutline />} size="small" color="teal" />
      <Icon icon={<HammerOutline />} size="regular" color="sky" />
      <Icon icon={<HammerOutline />} size="large" color="black" />
      <Icon icon={<HammerOutline />} size="xlarge" color="orange" />
    </div>
  ))
  .add('SyncCircleOutline', () => (
    <div>
      <Icon icon={<SyncCircleOutline />} size="small" color="teal" />
      <Icon icon={<SyncCircleOutline />} size="regular" color="sky" />
      <Icon icon={<SyncCircleOutline />} size="large" color="black" />
      <Icon icon={<SyncCircleOutline />} size="xlarge" color="orange" />
    </div>
  ))
  .add('ChevronUpCircle', () => (
    <div>
      <Icon icon={<ChevronUpCircle />} size="small" color="teal" />
      <Icon icon={<ChevronUpCircle />} size="regular" color="sky" />
      <Icon icon={<ChevronUpCircle />} size="large" color="black" />
      <Icon icon={<ChevronUpCircle />} size="xlarge" color="orange" />
    </div>
  ))
  .add('Bespoke Icons', () => (
    <div>
      <Icon size="large" color="orange" name="Overclodfcking" />
      <Icon size="large" color="orange" name="Allodfys" />
      <Icon size="large" color="orange" name="Bluedftooth" />
      <Icon size="large" color="orange" name="dfBrandNewCar" />
      <Icon size="large" color="orange" name="Calendar" />
      <Icon size="large" color="orange" name="AirConditioning" />
      <Icon size="large" color="orange" name="CruiseControl" />
      <Icon size="large" color="orange" name="DABRadio" />
      <Icon size="large" color="orange" name="DamageCover" />
      <Icon size="large" color="orange" name="Emissions" />
      <Icon size="large" color="orange" name="FuelEconomy" />
      <Icon size="large" color="orange" name="FuelType" />
      <Icon size="large" color="orange" name="HeatedSeats" />
      <Icon size="large" color="orange" name="Leather" />
      <Icon size="large" color="orange" name="LoadWidth" />
      <Icon size="large" color="orange" name="LoadHeight" />
      <Icon size="large" color="orange" name="LoadLength" />
      <Icon size="large" color="orange" name="MileageBooster" />
      <Icon size="large" color="orange" name="NoMOT" />
      <Icon size="large" color="orange" name="ReversingCamera" />
      <Icon size="large" color="orange" name="PlyLining" />
      <Icon size="large" color="orange" name="ListPrice" />
      <Icon size="large" color="orange" name="SatNav" />
      <Icon size="large" color="orange" name="ThumbsUp" />
      <Icon size="large" color="orange" name="Transmission" />
      <Icon size="large" color="orange" name="USB" />
      <Icon size="large" color="orange" name="WarrantyRosette2" />
      <Icon size="large" color="orange" name="WarrantyRosette3" />
      <Icon size="large" color="orange" name="WarrantyRosette4" />
      <Icon size="large" color="orange" name="WarrantyRosette5" />
      <Icon size="large" color="orange" name="WarrantyRosetteFull" />
    </div>
  ));
