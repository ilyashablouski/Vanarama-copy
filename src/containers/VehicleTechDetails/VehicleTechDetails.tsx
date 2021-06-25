import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { IKeyInformationItem } from './KeyInformation';
import {
  GetVehicleDetails_vehicleDetails,
  GetVehicleDetails_derivativeInfo,
  GetVehicleDetails_standardEquipment,
} from '../../../generated/GetVehicleDetails';
import { getStandardEquipmentData, getTechData } from './helpers';
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
  vehicleDetails?: GetVehicleDetails_vehicleDetails | null;
  derivativeInfo?: GetVehicleDetails_derivativeInfo | null;
  standardEquipment?: (GetVehicleDetails_standardEquipment | null)[] | null;
}

const accordionItems = (items: any, itemWrap: boolean) => {
  return items.map((item: any) => {
    return {
      id: item.categoryDescription,
      title: item.categoryDescription,
      children: <StructuredList list={item.items} itemWrap={itemWrap} />,
    };
  });
};

const VehicleTechDetails: React.FC<IVehicleTechDetailsProps> = props => {
  const { vehicleDetails, derivativeInfo, standardEquipment } = props;
  const [activeTab, setActiveTab] = useState(1);

  const technicalsAccordionItems = useMemo(
    () => accordionItems(getTechData(derivativeInfo?.technicals || []), false),
    [derivativeInfo?.technicals],
  );
  const standardEquipmentAccordionItems = useMemo(
    () =>
      accordionItems(getStandardEquipmentData(standardEquipment || []), true),
    [standardEquipment],
  );

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
          {standardEquipmentAccordionItems?.length ? (
            <Accordion items={standardEquipmentAccordionItems} />
          ) : (
            <p>Sorry, no standard equipment data available.</p>
          )}
        </TabPanel>
        <TabPanel index={3}>
          {technicalsAccordionItems?.length ? (
            <Accordion items={technicalsAccordionItems} />
          ) : (
            <p>Sorry, no data technical data available.</p>
          )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default VehicleTechDetails;
