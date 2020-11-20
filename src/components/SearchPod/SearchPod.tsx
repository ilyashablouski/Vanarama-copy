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
import {
  filterList_filterList_groupedRangesWithSlug as IRangesSlug,
  filterList_filterList_groupedRangesWithSlug_children as IOptionsDropdown,
} from '../../../generated/filterList';

enum typeToIndex {
  'Vans' = 1,
  'Cars',
}

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
  isHomePage,
  headingText,
}: ISearchPodProps) => {
  return (
    <Card
      optimisedHost={process.env.IMG_OPTIMISATION_HOST}
      className="hero-card"
    >
      <Tabs
        align="expand"
        activeIndex={activeTab}
        onChange={index => {
          onChangeTab(index);
        }}
      >
        <TabList dataTestId="tablist">
          {isHomePage &&
            config.map(({ tabName, type }) => (
              <Tab
                index={parseInt(typeToIndex[type as any], 10)}
                key={`${tabName}-tab`}
                dataTestId={`${tabName}tab`}
              >
                {tabName}
              </Tab>
            ))}
        </TabList>
        <TabPanels dataTestId="tabPanels">
          {config.map(tab => (
            <TabPanel
              index={parseInt(typeToIndex[tab.type as any], 10)}
              className="hero-card--inner"
              key={`${tab.tabName}-panels`}
              dataTestId={`${tab.tabName}-panel`}
            >
              <Heading
                size={isHomePage ? 'small' : 'lead'}
                color={isHomePage ? 'dark' : 'black'}
                tag="h2"
              >
                {headingText}
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
                        ? getOptions(accessor).map(option => {
                            // if option don't have label and slug structure
                            if (typeof option === 'string') {
                              return (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              );
                            }
                            return option.slug ? (
                              <option key={option.slug} value={option.slug}>
                                {option.label}
                              </option>
                            ) : null;
                          })
                        : vansCachedData.groupedRangesWithSlug
                            ?.filter((range: IRangesSlug) =>
                              getOptions('makeVans').some(
                                option =>
                                  range.parent.label ===
                                  (option as IOptionsDropdown).label,
                              ),
                            )
                            .map((range: IRangesSlug) => (
                              <optgroup
                                label={range.parent.label || ''}
                                key={range.parent.slug || ''}
                              >
                                {range.children.map(model => (
                                  <option
                                    key={model.slug || ''}
                                    value={model.slug || ''}
                                  >
                                    {model.label}
                                  </option>
                                ))}
                              </optgroup>
                            ))}
                    </Select>
                  </Formgroup>
                ))}
              </Form>
              <Button
                size="large"
                color="teal"
                fill="solid"
                className="-fullwidth"
                label={isHomePage ? tab.buttonText : 'Search Vehicles'}
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
