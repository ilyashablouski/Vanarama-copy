import React from 'react';
import dynamic from 'next/dynamic';

import { ISearchPodProps } from './interfaces';
import { filterList_filterList_groupedRanges as IRanges } from '../../../generated/filterList';

// Dynamic component loading.
const Tabs = dynamic(() =>
  import('@vanarama/uibook/lib/components/molecules/tabs'),
);
const TabList = dynamic(() =>
  import('@vanarama/uibook/lib/components/molecules/tabs/TabList'),
);
const Tab = dynamic(() =>
  import('@vanarama/uibook/lib/components/molecules/tabs/Tab'),
);
const TabPanels = dynamic(() =>
  import('@vanarama/uibook/lib/components/molecules/tabs/TabPanels'),
);
const TabPanel = dynamic(() =>
  import('@vanarama/uibook/lib/components/molecules/tabs/TabPanel'),
);
const Heading = dynamic(() =>
  import('@vanarama/uibook/lib/components/atoms/heading'),
);
const Formgroup = dynamic(() =>
  import('@vanarama/uibook/lib/components/molecules/formgroup'),
);
const Form = dynamic(() =>
  import('@vanarama/uibook/lib/components/organisms/form'),
);
const Select = dynamic(() =>
  import('@vanarama/uibook/lib/components/atoms/select'),
);
const Button = dynamic(() =>
  import('@vanarama/uibook/lib/components/atoms/button'),
);
const Card = dynamic(() =>
  import('@vanarama/uibook/lib/components/molecules/cards'),
);

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
                        ? getOptions(accessor).map(option => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))
                        : vansCachedData.groupedRanges
                            ?.filter((range: IRanges) =>
                              getOptions('makeVans').includes(range.parent),
                            )
                            .map((range: IRanges) => (
                              <optgroup label={range.parent} key={range.parent}>
                                {range.children.map((model: string) => (
                                  <option key={model} value={model}>
                                    {model}
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
