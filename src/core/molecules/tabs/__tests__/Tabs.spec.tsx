import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Tab from '../Tab';
import TabList from '../TabList';
import TabPanel from '../TabPanel';
import TabPanels from '../TabPanels';
import Tabs from '../Tabs';

const { getComputedStyle } = window;

describe('<Tabs />', () => {
  beforeAll(() => {
    window.getComputedStyle = elt => getComputedStyle(elt);
  });
  it('should only render the content for the active tab', () => {
    render(
      <Tabs activeIndex={2} onChange={jest.fn()}>
        <TabList>
          <Tab index={1}>Tab one</Tab>
          <Tab index={2}>Tab two</Tab>
          <Tab index={3}>Tab three</Tab>
        </TabList>
        <TabPanels>
          <TabPanel index={1}>
            <h1>Tab one</h1>
          </TabPanel>
          <TabPanel index={2}>
            <h1>Tab two</h1>
          </TabPanel>
          <TabPanel index={3}>
            <h1>Tab three</h1>
          </TabPanel>
        </TabPanels>
      </Tabs>,
    );

    expect(
      screen.queryByRole('tabpanel', { name: /tab one/i }),
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole('tabpanel', { name: /tab two/i }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('tabpanel', { name: /tab three/i }),
    ).not.toBeInTheDocument();
  });

  it('should call onChange when clicking a tab', () => {
    const onChange = jest.fn();
    render(
      <Tabs activeIndex={33} onChange={onChange}>
        <TabList>
          <Tab index={1337}>Tab one</Tab>
          <Tab index={2222}>Tab two</Tab>
          <Tab index={33}>Tab three</Tab>
        </TabList>
        <TabPanels>
          <TabPanel index={1337}>
            <h1>Tab one</h1>
          </TabPanel>
          <TabPanel index={2222}>
            <h1>Tab two</h1>
          </TabPanel>
          <TabPanel index={33}>
            <h1>Tab three</h1>
          </TabPanel>
        </TabPanels>
      </Tabs>,
    );

    const tab = screen.getByRole('tab', { name: /tab one/i });
    fireEvent.click(tab);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(1337, expect.any(Object));
  });

  it('should call onClick instead of onChange', () => {
    const onChange = jest.fn();
    const onClick = jest.fn();
    render(
      <Tabs activeIndex={33} onChange={onChange}>
        <TabList>
          <Tab onClick={onClick} index={1337}>
            Tab one
          </Tab>
          <Tab index={2222}>Tab two</Tab>
          <Tab index={33}>Tab three</Tab>
        </TabList>
        <TabPanels>
          <TabPanel index={1337}>
            <h1>Tab one</h1>
          </TabPanel>
          <TabPanel index={2222}>
            <h1>Tab two</h1>
          </TabPanel>
          <TabPanel index={33}>
            <h1>Tab three</h1>
          </TabPanel>
        </TabPanels>
      </Tabs>,
    );

    const tab = screen.getByRole('tab', { name: /tab one/i });
    fireEvent.click(tab);

    expect(onChange).toHaveBeenCalledTimes(0);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
