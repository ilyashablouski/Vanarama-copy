import React from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Accordion from '@vanarama/uibook/lib/components/molecules/accordion/Accordion';

const ACCORDION_ITEMS = [
  {
    id: 1,
    title: 'FREE Nationwide Delivery',
    children:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur incidunt at officiis quibusdam officia nam delectus doloremque perspiciatis! Accusantium eaque, ipsam harum voluptatibus eveniet necessitatibus.',
  },
  {
    id: 2,
    title: 'FREE 30-Day Returns*',
    children:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur incidunt at officiis quibusdam officia nam delectus doloremque perspiciatis! Accusantium eaque, ipsam harum voluptatibus eveniet necessitatibus.',
  },
  {
    id: 3,
    title: 'No Admin Fees',
    children:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur incidunt at officiis quibusdam officia nam delectus doloremque perspiciatis! Accusantium eaque, ipsam harum voluptatibus eveniet necessitatibus.',
  },
  {
    id: 4,
    title: 'Up To £500 Damage Cover*',
    children:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur incidunt at officiis quibusdam officia nam delectus doloremque perspiciatis! Accusantium eaque, ipsam harum voluptatibus eveniet necessitatibus.',
  },
  {
    id: 5,
    title: 'We’ll Cover 10% Mileage Excess*',
    children:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur incidunt at officiis quibusdam officia nam delectus doloremque perspiciatis! Accusantium eaque, ipsam harum voluptatibus eveniet necessitatibus.',
  },
  {
    id: 6,
    title: '4.5 Trustpilot Score',
    children:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur incidunt at officiis quibusdam officia nam delectus doloremque perspiciatis! Accusantium eaque, ipsam harum voluptatibus eveniet necessitatibus.',
  },
];

interface IWhyChooseVanaramaProps {}

const WhyChooseVanarama: React.FC<IWhyChooseVanaramaProps> = () => {
  return (
    <div className="tile--accordion">
      <Heading color="black" size="lead" className="pdp-section-title">
        Why Choose Vanarama?
      </Heading>
      <Accordion items={ACCORDION_ITEMS} />
    </div>
  );
};

export default WhyChooseVanarama;
