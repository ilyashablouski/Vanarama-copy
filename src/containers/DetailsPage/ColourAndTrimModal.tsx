import React, { useMemo, useState } from 'react';
import Price from 'core/atoms/price';
import Button from 'core/atoms/button/Button';
import Text from 'core/atoms/text/Text';
import Icon from 'core/atoms/icon';
import Close from 'core/assets/icons/Close';
import Heading from 'core/atoms/heading';
import Tab from 'core/molecules/tabs/Tab';
import TabList from 'core/molecules/tabs/TabList';
import Tabs from 'core/molecules/tabs';
import ColourTrimColumn from 'core/atoms/colour-trim-column/ColourTrimColumn';
import ImacaViewer from 'core/organisms/media-gallery/ImacaViewer';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { IOptionsList } from '../../types/detailsPage';
import { Nullable } from '../../types/common';
import { GetImacaAssets_getImacaAssets as IImacaAssets } from '../../../generated/GetImacaAssets';
import { isServerRenderOrAppleDevice } from '../../utils/deviceType';

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
  imacaAssets: Nullable<IImacaAssets>;
  isCar: boolean;
}

const MOBILE_TABS = [
  {
    tabName: 'Colour',
    index: 1,
  },
  {
    tabName: 'Trim',
    index: 2,
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
  imacaAssets,
  isCar,
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

  const shouldRenderImaca = useMemo(() => !!imacaAssets?.colours?.length, [
    imacaAssets,
  ]);

  return (
    <>
      <div className="color-trim">
        <div className="color-trim-header">
          <Text color="black" size="large" className="-b">
            Choose Your Colour & Trim
          </Text>
          <Icon
            dataTestId="icon-close"
            icon={<Close />}
            onClick={toggleColorAndTrimModalVisible}
          />
        </div>
        {shouldRenderImaca && (
          <div className="-container -mb-400">
            <LazyLoadComponent
              placeholder={<div className="imaca-viewer-placeholder" />}
              visibleByDefault={isServerRenderOrAppleDevice}
            >
              <ImacaViewer
                isOpenColourSelect={false}
                colour={selectedColour}
                setColour={setSelectedColour}
                assets={imacaAssets!}
                upscaleCanvas={isCar}
                isColourSelectorVisible={false}
                isDisclaimerVisible={false}
                imacaConfiguratorId="overlay-viewer"
              />
            </LazyLoadComponent>
          </div>
        )}

        {isMobile && (
          <Tabs
            align="expand"
            activeIndex={activeTab}
            onChange={index => setActiveTab(index)}
            className="-mb-400"
          >
            <TabList>
              {MOBILE_TABS.map(tab => (
                <Tab index={tab.index} key={tab.tabName} className="-p-400">
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
                return (
                  <ColourTrimColumn
                    item={item}
                    selectedItem={selectedColour}
                    setSelectedItem={changeColour}
                    key={item.leadTime}
                  />
                );
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
                return (
                  <ColourTrimColumn
                    item={item}
                    selectedItem={selectedTrim}
                    setSelectedItem={changeTrim}
                    key={item.leadTime}
                  />
                );
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
