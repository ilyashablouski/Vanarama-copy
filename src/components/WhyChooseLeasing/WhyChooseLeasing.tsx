import React from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import WarrantyRosetteFull from '@vanarama/uibook/lib/assets/icons/WarrantyRosetteFull';
import WarrantyRosette5 from '@vanarama/uibook/lib/assets/icons/WarrantyRosette5';
import WarrantyRosette4 from '@vanarama/uibook/lib/assets/icons/WarrantyRosette4';
import WarrantyRosette3 from '@vanarama/uibook/lib/assets/icons/WarrantyRosette3';
import WarrantyRosette2 from '@vanarama/uibook/lib/assets/icons/WarrantyRosette2';
import BrandNewCar from '@vanarama/uibook/lib/assets/icons/BrandNewCar';
import Calendar from '@vanarama/uibook/lib/assets/icons/Calendar';
import NoMOT from '@vanarama/uibook/lib/assets/icons/NoMOT';
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
          <Icon icon={<WarrantyRosetteFull />} color="orange" size="xlarge" />,
        );
      case '5':
        return renderGridItem(
          'Full 5 Year Warranty',
          <Icon icon={<WarrantyRosette5 />} color="orange" size="xlarge" />,
        );
      case '4':
        return renderGridItem(
          'Full 4 Year Warranty',
          <Icon icon={<WarrantyRosette4 />} color="orange" size="xlarge" />,
        );
      case '3':
        return renderGridItem(
          'Full 3 Year Warranty',
          <Icon icon={<WarrantyRosette3 />} color="orange" size="xlarge" />,
        );
      case '2':
        return renderGridItem(
          'Full 2 Year Warranty',
          <Icon icon={<WarrantyRosette2 />} color="orange" size="xlarge" />,
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
        <Icon icon={<BrandNewCar />} color="orange" size="xlarge" />
        <div>
          <Heading tag="div" size="regular" color="black">
            Brand New Vehicles
          </Heading>
        </div>
      </div>
      {warrantyRender()}
      <div className="pdp--feature-grid--item">
        <Icon icon={<Calendar />} color="orange" size="xlarge" />
        <div>
          <Heading tag="div" size="regular" color="black">
            Fixed Monthly Payments
          </Heading>
        </div>
      </div>
      <div className="pdp--feature-grid--item">
        <Icon icon={<NoMOT />} color="orange" size="xlarge" />
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
