import React, { useState } from 'react';
import Tabs from '@vanarama/uibook/lib/components/molecules/tabs';
import TabList from '@vanarama/uibook/lib/components/molecules/tabs/TabList';
import Tab from '@vanarama/uibook/lib/components/molecules/tabs/Tab';
import TabPanels from '@vanarama/uibook/lib/components/molecules/tabs/TabPanels';
import TabPanel from '@vanarama/uibook/lib/components/molecules/tabs/TabPanel';
import KeyInformation from './KeyInformation';

interface IVehicleTechDetailsProps {
  partyByUuid: string;
}

const VehicleTechDetails: React.FC<IVehicleTechDetailsProps> = props => {
  const { partyByUuid } = props;
  console.log(partyByUuid);
  const [activeTab, setActiveTab] = useState(1);

  const keysInformation = [
    { icon: '', title: '0-62 mph', description: '11 Seconds' },
  ];

  return (
    <Tabs
      activeIndex={activeTab}
      onChange={index => setActiveTab(index)}
      align="expand"
      variant="alternative"
    >
      <TabList>
        <Tab index={1}>Tab one</Tab>
        <Tab index={2}>Tab two</Tab>
        <Tab index={3}>Tab three</Tab>
      </TabList>
      <TabPanels className="-p-000">
        <TabPanel index={1}>
          <KeyInformation keysInformation={keysInformation} />
        </TabPanel>
        <TabPanel index={2}>
          <h1>Tab two</h1>
          <p>
            Cras dolor erat, elementum sit amet turpis rutrum, eleifend molestie
            urna. Pellentesque habitant morbi tristique senectus et netus et
            malesuada fames ac turpis egestas. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Quisque interdum turpis sit amet urna
            congue commodo.
          </p>
        </TabPanel>
        <TabPanel index={3}>
          <h1>Tab three</h1>
          <p>
            In sagittis tempus lacus. Nunc leo elit, fermentum convallis diam
            sit amet, euismod sodales ex. Interdum et malesuada fames ac ante
            ipsum primis in faucibus. Aenean eleifend interdum urna, eu
            imperdiet arcu. Curabitur volutpat mauris id purus mollis, et
            dignissim.
          </p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default VehicleTechDetails;
