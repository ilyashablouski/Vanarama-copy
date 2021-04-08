import React from 'react';
import dynamic from 'next/dynamic';
import { GetVehicleDetails_vehicleDetails_rangeFaqs } from '../../../generated/GetVehicleDetails';
import { GENERAL_LEASING_FAQ } from './config';
import Skeleton from '../Skeleton';

const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Accordion = dynamic(() => import('core/molecules/accordion/Accordion'), {
  loading: () => <Skeleton count={1} />,
});

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
      <Heading
        color="black"
        size="lead"
        className="pdp-section-question"
        tag="h2"
      >
        Frequently Asked Questions
      </Heading>
      <Accordion items={accordionItems()} />
    </div>
  );
};

export default FrequentlyAskedQuestions;
