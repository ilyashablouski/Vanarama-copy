/* eslint-disable @typescript-eslint/no-unused-expressions */

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { IKeyInformationItem } from './KeyInformation';
import {
  GetVehicleDetails_vehicleDetails,
  GetVehicleDetails_derivativeInfo,
  GetVehicleDetails_derivativeInfo_standardEquipments,
  GetVehicleDetails_derivativeInfo_technicals,
} from '../../../generated/GetVehicleDetails';
import { getTechData } from './helpers';
import Skeleton from '../../components/Skeleton';

const KeyInformation = dynamic(() => import('./KeyInformation'), {
  loading: () => <Skeleton count={5} />,
});
const StructuredList = dynamic(() => import('core/organisms/structured-list'), {
  loading: () => <Skeleton count={3} />,
});
const Accordion = dynamic(() => import('core/molecules/accordion/Accordion'), {
  loading: () => <Skeleton count={1} />,
});
const Tabs = dynamic(() => import('core/molecules/tabs'), {
  loading: () => <Skeleton count={1} />,
});
const Tab = dynamic(() => import('core/molecules/tabs/Tab'), {
  loading: () => <Skeleton count={1} />,
});
const TabList = dynamic(() => import('core/molecules/tabs/TabList'));
const TabPanel = dynamic(() => import('core/molecules/tabs/TabPanel'), {
  loading: () => <Skeleton count={1} />,
});
const TabPanels = dynamic(() => import('core/molecules/tabs/TabPanels'), {
  loading: () => <Skeleton count={3} />,
});

interface IVehicleTechDetailsProps {
  vehicleDetails: GetVehicleDetails_vehicleDetails | null | undefined;
  derivativeInfo: GetVehicleDetails_derivativeInfo | null | undefined;
}

const VehicleTechDetails: React.FC<IVehicleTechDetailsProps> = props => {
  const { vehicleDetails, derivativeInfo } = props;
  const [activeTab, setActiveTab] = useState(1);

  const standardEquipments = getTechData(
    (derivativeInfo?.standardEquipments as GetVehicleDetails_derivativeInfo_standardEquipments[]) ||
      [],
  );
  const technicals = getTechData(
    (derivativeInfo?.technicals as GetVehicleDetails_derivativeInfo_technicals[]) ||
      [],
  );

  const accordionItems = (items: any) => {
    return items.map((item: any) => {
      return {
        id: item.categoryDescription,
        title: item.categoryDescription,
        children: <StructuredList list={item.items} />,
      };
    });
  };

  return (
    <Tabs
      activeIndex={activeTab}
      onChange={index => setActiveTab(index)}
      align="expand"
      variant="alternative"
    >
      <TabList>
        <Tab index={1}>Key Information</Tab>
        <Tab index={2}>Standard Equipment</Tab>
        <Tab index={3}>Technical Specification</Tab>
      </TabList>
      <TabPanels className="-p-000">
        <TabPanel index={1}>
          {vehicleDetails?.keyInformation?.length ? (
            <KeyInformation
              keysInformation={
                vehicleDetails.keyInformation as IKeyInformationItem[]
              }
            />
          ) : (
            <p>Sorry, no key information data availbale.</p>
          )}
        </TabPanel>
        <TabPanel index={2}>
          {standardEquipments?.length ? (
            <Accordion items={accordionItems(standardEquipments)} />
          ) : (
            <p>Sorry, no standard equipment data available.</p>
          )}
        </TabPanel>
        <TabPanel index={3}>
          {technicals?.length ? (
            <Accordion items={accordionItems(technicals)} />
          ) : (
            <p>Sorry, no data technical data available.</p>
          )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default VehicleTechDetails;
