/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import Tabs from '@vanarama/uibook/lib/components/molecules/tabs';
import TabList from '@vanarama/uibook/lib/components/molecules/tabs/TabList';
import Tab from '@vanarama/uibook/lib/components/molecules/tabs/Tab';
import TabPanels from '@vanarama/uibook/lib/components/molecules/tabs/TabPanels';
import TabPanel from '@vanarama/uibook/lib/components/molecules/tabs/TabPanel';
import Accordion from '@vanarama/uibook/lib/components/molecules/accordion/Accordion';
import StructuredList from '@vanarama/uibook/lib/components/organisms/structured-list';
import KeyInformation, { KeyInformationItem } from './KeyInformation';
import {
  GetVehicleDetails_vehicleDetails,
  GetVehicleDetails_derivativeInfo,
  GetVehicleDetails_derivativeInfo_standardEquipments,
  GetVehicleDetails_derivativeInfo_technicals,
} from '../../../generated/GetVehicleDetails';
import { getTechData } from './helpers';

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
    return items.map((item: any) => ({
      id: item.categoryDescription,
      title: item.categoryDescription,
      children: <StructuredList list={item.items} />,
    }));
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
                vehicleDetails.keyInformation as KeyInformationItem[]
              }
            />
          ) : (
            <p>Error: No data</p>
          )}
        </TabPanel>
        <TabPanel index={2}>
          {standardEquipments?.length ? (
            <Accordion items={accordionItems(standardEquipments)} />
          ) : (
            <p>Error: No data</p>
          )}
        </TabPanel>
        <TabPanel index={3}>
          {technicals?.length ? (
            <Accordion items={accordionItems(technicals)} />
          ) : (
            <p>Error: No data</p>
          )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default VehicleTechDetails;
