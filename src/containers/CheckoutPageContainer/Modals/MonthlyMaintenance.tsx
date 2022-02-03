import React from 'react';

import Text from 'core/atoms/text';
import Heading from 'core/atoms/heading';
import List from 'core/atoms/list';
import Checkmark from 'core/assets/icons/Checkmark';
import IconList, { IconListItem } from 'core/organisms/icon-list';
import { includedItems, notIncludedItems } from '../../DetailsPage/config';

const MonthlyMaintenance = () => (
  <>
    <Heading className="title -mt-400" color="black" size="large" tag="h2">
      The Vanarama Service Plan (Our Maintenance Package) Covers:
    </Heading>
    <Text tag="p" color="darker" className="-mv-400" size="regular">
      We know how important it is to keep you moving and keep your vehicle on
      the road which is why we introduced the Vanarama Service Plan. The Plan
      covers all routine servicing & maintenance but also provides full RAC
      Breakdown Cover and a 7-day relief vehicle if you break down for a
      hassle-free, fixed monthly charge so you don’t have to worry about a
      thing!
    </Text>
    <Heading size="lead" color="black" className="-mt-500">
      What’s Included?
    </Heading>
    <IconList className="maintenanceList -mt-100">
      {includedItems.map(({ value, innerItems }) => (
        <IconListItem
          iconColor="teal"
          className="-custom"
          key={value.toString()}
          listIcon={<Checkmark />}
        >
          {value}
          {innerItems && (
            <IconList>
              {innerItems?.map((text, idx) => (
                <IconListItem
                  iconColor="teal"
                  className="-custom"
                  key={idx.toString()}
                  listIcon={<Checkmark />}
                >
                  {text}
                </IconListItem>
              ))}
            </IconList>
          )}
        </IconListItem>
      ))}
    </IconList>
    <Heading size="lead" color="black" className="-mt-300">
      What’s NOT Included?
    </Heading>
    <List>
      {notIncludedItems.map(item => (
        <li key={item}>{item}</li>
      ))}
    </List>
  </>
);

export default MonthlyMaintenance;
