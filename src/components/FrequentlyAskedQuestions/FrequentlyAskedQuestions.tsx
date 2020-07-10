/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Accordion from '@vanarama/uibook/lib/components/molecules/accordion/Accordion';
import { GetVehicleDetails_vehicleDetails_rangeFaqs } from '../../../generated/GetVehicleDetails';
import { GENERAL_LEASING_FAQ } from './config';

interface IFrequentlyAskedQuestionsProps {
  rangeFAQ: GetVehicleDetails_vehicleDetails_rangeFaqs[];
  rangeFAQTitle: string;
}

const FrequentlyAskedQuestions: React.FC<IFrequentlyAskedQuestionsProps> = ({
  rangeFAQ,
  rangeFAQTitle,
}) => {
  const renderChildren = (
    children: GetVehicleDetails_vehicleDetails_rangeFaqs,
    id: number,
  ) => (
    <div className="pdp--qanda" key={id}>
      <Heading color="black" size="regular" tag="div" className="pdp--qanda-q">
        {children.question}
      </Heading>
      <Text tag="div" size="regular" color="darker" className="pdp--qanda-a">
        {children.answer}
      </Text>
    </div>
  );

  const accordionItems = () => {
    const itemArray = [
      {
        id: 0,
        title: 'General Leasing FAQs',
        children: (
          <>
            {GENERAL_LEASING_FAQ.map(
              (
                faq: GetVehicleDetails_vehicleDetails_rangeFaqs,
                index: number,
              ) => renderChildren(faq, index),
            )}
          </>
        ),
      },
    ];
    if (rangeFAQ?.length) {
      itemArray.push({
        id: 1,
        title: `${rangeFAQTitle} FAQs`,
        children: (
          <>
            {rangeFAQ?.map(
              (
                faq: GetVehicleDetails_vehicleDetails_rangeFaqs,
                index: number,
              ) => renderChildren(faq, index),
            ) || ''}
          </>
        ),
      });
    }
    return itemArray;
  };

  return (
    <div className="tile--accordion">
      <Heading color="black" size="lead" className="pdp-section-question">
        Frequently Asked Questions
      </Heading>
      <Accordion items={accordionItems()} />
    </div>
  );
};

export default FrequentlyAskedQuestions;
