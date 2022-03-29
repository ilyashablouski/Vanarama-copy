import React, { useState } from 'react';
import ImageV2 from 'core/atoms/image/ImageV2';
import Price from 'core/atoms/price';
import Button from 'core/atoms/button/Button';
import Text from 'core/atoms/text/Text';
import Icon from 'core/atoms/icon';
import Close from 'core/assets/icons/Close';
import Heading from 'core/atoms/heading';
import ColourTrimChoiceBoxes from 'core/atoms/colour-trim-choice-boxes/ColourTrimChoiceBoxes';
import Tab from 'core/molecules/tabs/Tab';
import TabList from 'core/molecules/tabs/TabList';
import Tabs from 'core/molecules/tabs';
import { IOptionsList } from '../../types/detailsPage';
import { Nullable } from '../../types/common';

const choices = (
  item: IOptionsList,
  selectedItem: Nullable<number>,
  setSelectedItem: (optionId: number, isFactoryOrder?: boolean) => void,
) => (
  <div key={item.leadTime}>
    <Heading tag="span" size="small" color="black" className="-mb-400">
      {item?.leadTime}
    </Heading>
    <ColourTrimChoiceBoxes
      data={item}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
    />
  </div>
);

interface IColourAndTrimModalProps {
  price: number;
  toggleColorAndTrimModalVisible: () => void;
  headingText: string;
  sortedTrimList: Nullable<IOptionsList[]>;
  colourData: Nullable<IOptionsList[]>;
  isMobile: boolean;
  selectedColour: Nullable<number>;
  setSelectedColour: React.Dispatch<React.SetStateAction<number | null>>;
  selectedTrim: Nullable<number>;
  setSelectedTrim: React.Dispatch<React.SetStateAction<number | null>>;
  setIsFactoryOrder: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  imageUrl: string;
  manufacturerName: string;
}

const MobileTabs = [
  {
    tabName: 'Colour',
    type: 1,
  },
  {
    tabName: 'Trim',
    type: 2,
  },
];

const ColourAndTrimModal: React.FC<IColourAndTrimModalProps> = ({
  price,
  toggleColorAndTrimModalVisible,
  headingText,
  colourData,
  isMobile,
  selectedColour,
  setSelectedColour,
  selectedTrim,
  setSelectedTrim,
  sortedTrimList,
  setIsFactoryOrder,
  imageUrl,
  manufacturerName,
}) => {
  const [activeTab, setActiveTab] = useState(1);

  const changeColour = (
    optionId: number,
    isFactoryOrder: boolean | undefined,
  ) => {
    setSelectedColour(optionId);
    setIsFactoryOrder(isFactoryOrder);
  };
  const changeTrim = (optionId: number) => {
    setSelectedTrim(optionId);
  };

  return (
    <>
      <div className="color-trim">
        <div className="color-trim-header">
          <Text color="black" size="large" className="-b">
            Choose Your Color & Trim
          </Text>
          <Icon
            dataTestId="icon-close"
            icon={<Close />}
            onClick={toggleColorAndTrimModalVisible}
          />
        </div>

        <div className="-container -mb-400">
          <ImageV2
            quality={60}
            objectFit="cover"
            lazyLoad
            src={imageUrl}
            alt={manufacturerName}
            plain
          />
        </div>

        {isMobile && (
          <Tabs
            align="expand"
            activeIndex={activeTab}
            onChange={index => setActiveTab(index)}
            className="-mb-400"
          >
            <TabList>
              {MobileTabs.map(tab => (
                <Tab index={tab.type} key={tab.tabName} className="-p-400">
                  {tab.tabName}
                </Tab>
              ))}
            </TabList>
          </Tabs>
        )}

        {((!isMobile && colourData) ||
          (isMobile && activeTab === 1 && colourData)) && (
          <div className="color-trim-box">
            <Heading
              tag="div"
              size="regular"
              color="black"
              className="headingText -mb-500"
            >
              PAINT COLOUR
            </Heading>
            <div className="row:cards-3col">
              {colourData?.map(item => {
                return choices(item, selectedColour, changeColour);
              })}
            </div>
          </div>
        )}

        {((!isMobile && sortedTrimList?.length) ||
          (isMobile && activeTab === 2 && sortedTrimList?.length)) && (
          <div className="color-trim-box">
            <Heading
              tag="div"
              size="regular"
              color="black"
              className="headingText -mb-500"
            >
              TRIM
            </Heading>
            <div className="row:cards-3col">
              {sortedTrimList?.map(item => {
                return choices(item, selectedTrim, changeTrim);
              })}
            </div>
          </div>
        )}
      </div>
      <div className="color-trim-footer">
        <div>
          <Price price={price} size="large" />
          <Heading
            tag="div"
            size="small"
            color="darker"
            className="headingText -pt-100"
          >
            {headingText}
          </Heading>
        </div>
        <Button
          label="Apply"
          color="teal"
          onClick={toggleColorAndTrimModalVisible}
          size="regular"
        />
      </div>
    </>
  );
};

export default ColourAndTrimModal;
