import React from 'react';

import Text from 'core/atoms/text';
import Heading from 'core/atoms/heading';
import List from 'core/atoms/list';
import Icon from 'core/atoms/icon';
import Checkmark from 'core/assets/icons/Checkmark';

const INCLUDED_ADVANTAGES = [
  'Routine servicing & maintenance.',
  'Batteries, brake pads & exhaust replacement caused by fair wear & tear.',
  'Tyre replacement, including 1 accidental tyre per year which is an upgrade from a standard funder package.',
  'Any warranty-related work.',
  'Oil & antifreeze top-ups.',
  'MOTs, if required.',
];

const NOT_INCLUDED_ADVANTAGES = [
  'Fuel, Ad Blue, washing or parking charges.',
  'Damage to windscreens or mirrors.',
  'Winter tyres.',
  'Mis-fuelling.',
  'Service or repair work for converted bodies, tail lifts or refrigerated vehicles.',
  'Repairs or maintenance caused by accidental, negligent or wilful damage.',
];

const MonthlyMaintenance = () => (
  <>
    <Heading className="title -mt-400" color="black" size="large" tag="span">
      Service Plus Maintenance Package
    </Heading>
    <Heading size="lead" color="black" className="-mt-500">
      What’s Included?
    </Heading>
    <List>
      {INCLUDED_ADVANTAGES.map(item => (
        <li className="-custom" key={item}>
          <Icon size="regular" color="teal" icon={<Checkmark />} />
          {item}
        </li>
      ))}
    </List>
    <Heading size="lead" color="black" className="-mt-300">
      What’s NOT Included?
    </Heading>
    <List>
      {NOT_INCLUDED_ADVANTAGES.map(item => (
        <li key={item}>{item}</li>
      ))}
    </List>
    <Text size="regular" color="darker" className="copy -mt-300">
      PS: Without this package you’ll have to pay for all servicing and
      maintenance for your vehicle for the duration of your lease.
    </Text>
  </>
);

export default MonthlyMaintenance;
