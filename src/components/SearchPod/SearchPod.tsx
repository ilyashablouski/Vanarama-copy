import React from 'react';
import dynamic from 'next/dynamic';
import Select from 'core/atoms/select';
import Card from 'core/molecules/cards';
import {
  filterList_filterList_groupedRangesWithSlug as IRangesSlug,
  filterList_filterList_groupedRangesWithSlug_children as IOptionsDropdown,
} from '../../../generated/filterList';
import { ISearchPodProps } from './interfaces';
import Skeleton from '../Skeleton';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Button = dynamic(() => import('core/atoms/button'), {
  loading: () => <Skeleton count={4} />,
});
const Form = dynamic(() => import('core/organisms/form'));
const Formgroup = dynamic(() => import('core/molecules/formgroup'));

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

enum TypeToIndex {
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
  hasCarManufacturerSelected,
  hasVansManufacturerSelected,
  vansData,
  vansCachedData,
  isHomePage,
  headingText,
  customCTAColor,
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
          {isHomePage &&
            config.map(({ tabName, type }) => (
              <Tab
                index={parseInt(TypeToIndex[type as any], 10)}
                key={`${tabName}-tab`}
                dataTestId={`${tabName}tab`}
                dataUiTestId={`searchPod-${tabName}-tab`}
              >
                {tabName}
              </Tab>
            ))}
        </TabList>
        <TabPanels dataTestId="tabPanels">
          {config.map(tab => (
            <TabPanel
              index={parseInt(TypeToIndex[tab.type as any], 10)}
              className="hero-card--inner"
              key={`${tab.tabName}-panels`}
              dataTestId={`${tab.tabName}-panel`}
              dataUiTestId={`searchPod-${tab.tabName}-panel`}
            >
              <Heading
                size={isHomePage ? 'small' : 'lead'}
                color={isHomePage ? 'dark' : 'black'}
                tag="h2"
              >
                {headingText}
              </Heading>
              <Form>
                {tab.dropdowns.map(({ accessor, label, placeholder }) => (
                  <Formgroup key={accessor}>
                    <Select
                      dataTestId={accessor}
                      dataUiTestId={`searchPod-${accessor}-select`}
                      name={accessor}
                      className="-fullwidth"
                      placeholder={label}
                      ref={registerDropdown}
                    >
                      <>
                        {!(
                          accessor.indexOf('model') > -1 &&
                          tab.type === 'Cars' &&
                          !hasCarManufacturerSelected
                        ) ? (
                          <option key="All" value=" ">
                            All{' '}
                            {placeholder.charAt(0).toUpperCase() +
                              placeholder.slice(1)}
                            s
                          </option>
                        ) : (
                          <optgroup label="Please Select Make" />
                        )}
                      </>
                      {!(
                        accessor.indexOf('model') > -1 &&
                        tab.type === 'Vans' &&
                        !hasVansManufacturerSelected
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
                        : (
                            vansData?.groupedRangesWithSlug ||
                            vansCachedData.groupedRangesWithSlug
                          )
                            ?.filter((range: IRangesSlug) =>
                              getOptions('manufacturerVans').some(
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
                customCTAColor={customCTAColor}
                label={isHomePage ? tab.buttonText : 'Search Vehicles'}
                dataTestId={`${tab.type}searchBtn`}
                onClick={() => onSearch(tab.type)}
                dataUiTestId={`searchPod-${tab.type}Search-button`}
              />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Card>
  );
};

export default React.memo(SearchPod);
