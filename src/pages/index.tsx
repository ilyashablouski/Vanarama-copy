import Link from 'next/link';
import { Tabs, Tab, TabContent } from  '@vanarama/uibook/packages/ui-components/src/css/molecules/Tabs';

const OlafHomePage = () => {
  return (
    <>
      <Tabs defaultActiveTabIndex={0}>
    <Tab title="Login">
      <TabContent id="tab-content-login">
        This is content for Tab 1
      </TabContent>
    </Tab>
    <Tab title="Register">
      <TabContent id="tab-content-register">
        This is content for Tab 2
      </TabContent>
    </Tab>
  </Tabs>
    </>
  );
};

export default OlafHomePage;
