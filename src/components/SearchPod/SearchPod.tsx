import React from 'react';
import Tabs from '@vanarama/uibook/lib/components/molecules/tabs';
import TabList from '@vanarama/uibook/lib/components/molecules/tabs/TabList';
import Tab from '@vanarama/uibook/lib/components/molecules/tabs/Tab';
import TabPanels from '@vanarama/uibook/lib/components/molecules/tabs/TabPanels';
import TabPanel from '@vanarama/uibook/lib/components/molecules/tabs/TabPanel';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import Select from '@vanarama/uibook/lib/components/atoms/select';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import { ISearchPodProps } from './interfaces';
import { filterList_filterList_groupedRanges as IRanges } from '../../../generated/filterList';

const SearchPod = ({
  activeTab,
  onChangeTab,
  config,
  onSearch,
  registerDropdown,
  getOptions,
  hasCarMakeSelected,
  hasVansMakeSelected,
  vansCachedData,
}: ISearchPodProps) => {
  return (
    <Card className="hero-card">
      <Tabs
        align="expand"
        activeIndex={activeTab}
        onChange={index => {
          onChangeTab(index);
        }}
      >
        <TabList dataTestId="tablist">
          {config.map((tab, index) => (
            <Tab
              index={index + 1}
              key={`${tab.tabName}-tab`}
              dataTestId={`${tab.tabName}tab`}
            >
              {tab.tabName}
            </Tab>
          ))}
        </TabList>
        <TabPanels dataTestId="tabPanels">
          {config.map((tab, index) => (
            <TabPanel
              index={index + 1}
              className="hero-card--inner"
              key={`${tab.tabName}-panels`}
              dataTestId={`${tab.tabName}-panel`}
            >
              <Heading size="small" color="dark" tag="span">
                Search vehicles
              </Heading>
              <Form>
                {tab.dropdowns.map(({ accessor, label }) => (
                  <Formgroup key={accessor}>
                    <Select
                      dataTestId={accessor}
                      name={accessor}
                      className="-fullwidth"
                      placeholder={label}
                      ref={registerDropdown}
                    >
                      <>
                        {!(
                          accessor.indexOf('model') > -1 &&
                          tab.type === 'Cars' &&
                          !hasCarMakeSelected
                        ) ? (
                          <option key="All" value="">
                            All{' '}
                            {accessor
                              .replace(tab.type, '')
                              .charAt(0)
                              .toUpperCase() +
                              accessor.replace(tab.type, '').slice(1)}
                            s
                          </option>
                        ) : (
                          <optgroup label="Please Select Make" />
                        )}
                      </>
                      {!(
                        accessor.indexOf('model') > -1 &&
                        tab.type === 'Vans' &&
                        !hasVansMakeSelected
                      )
                        ? getOptions(accessor).map(option => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))
                        : vansCachedData.groupedRanges?.map(
                            (range: IRanges) => (
                              <optgroup label={range.parent} key={range.parent}>
                                {range.children.map((model: string) => (
                                  <option key={model} value={model}>
                                    {model}
                                  </option>
                                ))}
                              </optgroup>
                            ),
                          )}
                    </Select>
                  </Formgroup>
                ))}
              </Form>
              <Button
                size="large"
                color="teal"
                fill="solid"
                className="-fullwidth"
                label={tab.buttonText}
                dataTestId={`${tab.type}searchBtn`}
                onClick={() => onSearch(tab.type)}
              />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Card>
  );
};

export default SearchPod;
