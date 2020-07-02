import React from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Accordion from '@vanarama/uibook/lib/components/molecules/accordion/Accordion';

const GENERAL_LEASING_FAQ = [
  {
    id: 0,
    question: 'How Long Will My Vehicle Delivery Take?',
    answer:
      "Delivery time really depends on several factors, including the vehicle you choose, whether it's in stock & if you're having accessories fitted. If your vehicle is in stock, available & already kitted out the way you want it, it could take as little as 2-3 weeks to be delivered.",
  },
  {
    id: 1,
    question: 'Can I Lease A Vehicle With Bad Credit?',
    answer:
      'Leasing is a form of vehicle finance or credit, which means funders will look into your credit history when you apply to lease. If you’ve missed payments or cancelled finance in the past, these can negatively impact your credit score. Vanarama works with more than 10 potential funders & we’ll always try to match you with a funder to suit your needs.',
  },
  {
    id: 2,
    question: 'Can I Cancel A Lease Part Way Through?',
    answer:
      'A lease contract can be cancelled by requesting an early termination. If you request this, the vehicle must be returned to the funder & you’ll pay a penalty fee - the amount varies depending on the funder & the type of lease agreement you have, but it could be more than 50% of all remaining payments. If you lease a car with us, you will be covered by Redundancy Protection. This means if due to an unexpected life event you are suddenly unable to afford your payments, we may be able to help. See more about this here.',
  },
  {
    id: 3,
    question: 'Which Businesses Can Lease Vehicles?',
    answer:
      'In general, any business can lease a vehicle & benefit from the cost savings leasing offers - even new businesses. ',
  },
  {
    id: 4,
    question: 'Can I Change My Annual Mileage Limit Mid-Contract?',
    answer:
      'Yes, although the process will depend on which funder your lease is with & if you are eligible to do so. If you think your mileage limit needs changing, call us straight away so we can discuss your options.',
  },
  {
    id: 5,
    question: 'What Is The Shortest Lease Contract I Can Take?',
    answer:
      'The shortest lease term available from Vanarama is 2 years, up to a maximum term of 5 years. ',
  },
  {
    id: 6,
    question: 'How Does Fair Wear & Tear Work?',
    answer:
      'If your lease contract requires you to hand your vehicle back at the end, it will be inspected by the finance company for any damage that isn’t considered ‘fair wear & tear’. The odd bump, scratch or scuff is fine - after all, you could have been driving this vehicle for up to 5 years - excessive damage is not & penalties are often charged to repair it. ',
  },
];

interface IFaq {
  question: string;
  answer: string;
  id: number;
}

interface IFrequentlyAskedQuestionsProps {
  rangeFAQ: IFaq[];
  rangeFAQTitle: string;
}

const FrequentlyAskedQuestions: React.FC<IFrequentlyAskedQuestionsProps> = ({
  rangeFAQ,
  rangeFAQTitle,
}) => {
  const renderChildren = (children: IFaq) => (
    <div className="pdp--qanda" key={children.id}>
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
        children: <>{GENERAL_LEASING_FAQ.map(faq => renderChildren(faq))}</>,
      },
    ];
    if (rangeFAQ?.length) {
      itemArray.push({
        id: 1,
        title: `${rangeFAQTitle} FAQs`,
        children: <>{rangeFAQ?.map(faq => renderChildren(faq)) || ''}</>,
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
