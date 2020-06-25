import React from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';

interface IWhyChooseLeasingProps {
  warranty: string;
}

const WhyChooseLeasing: React.FC<IWhyChooseLeasingProps> = ({ warranty }) => {
  const renderGridItem = (title: string, icon: JSX.Element) => (
    <div className="pdp--feature-grid--item">
      {icon}
      <div>
        <Heading tag="div" size="regular" color="black">
          {title}
        </Heading>
      </div>
    </div>
  );

  const warrantyRender = () => {
    switch (warranty) {
      case 'N/A':
        return renderGridItem(
          'Full Manufacturer Warranty',
          <Icon name="WarrantyRosetteFull" color="orange" size="xlarge" />,
        );
      case '2':
      case '3':
      case '4':
      case '5':
        return renderGridItem(
          `Full ${warranty} Year Warranty`,
          <Icon
            name={`WarrantyRosette${warranty}`}
            color="orange"
            size="xlarge"
          />,
        );
      default:
        return null;
    }
  };

  return (
    <div className="pdp--feature-grid -col2">
      <Heading tag="span" color="black" size="lead">
        Why Choose Leasing?
      </Heading>
      <div className="pdp--feature-grid--item">
        <Icon name="BrandNewCar" color="orange" size="xlarge" />
        <div>
          <Heading tag="div" size="regular" color="black">
            Brand New Vehicles
          </Heading>
        </div>
      </div>
      {warrantyRender()}
      <div className="pdp--feature-grid--item">
        <Icon name="Calendar" color="orange" size="xlarge" />
        <div>
          <Heading tag="div" size="regular" color="black">
            Fixed Monthly Payments
          </Heading>
        </div>
      </div>
      <div className="pdp--feature-grid--item">
        <Icon name="NoMOT" color="orange" size="xlarge" />
        <div>
          <Heading tag="div" size="regular" color="black">
            No MOT Costs
          </Heading>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseLeasing;
