import React from 'react';
import ImageV2 from 'core/atoms/image/ImageV2';
import Price from 'core/atoms/price';
import Button from 'core/atoms/button/Button';
import Text from 'core/atoms/text/Text';
import Icon from 'core/atoms/icon';
import Close from 'core/assets/icons/Close';
import Heading from 'core/atoms/heading';
import { GetVehicleDetails } from '../../../generated/GetVehicleDetails';

interface IColourAndTrimModalProps {
  data?: GetVehicleDetails;
  price: number;
  toggleColorAndTrimModalVisible: () => void;
  headingText: string;
}

const ColourAndTrimModal: React.FC<IColourAndTrimModalProps> = ({
  data,
  price,
  toggleColorAndTrimModalVisible,
  headingText,
}) => {
  const image = data?.vehicleImages?.[0];

  return (
    <>
      <div className="color-trim">
        <div className="color-trim-header">
          <Text color="black" size="large">
            Choose Your Color & Trim
          </Text>
          <Icon icon={<Close />} onClick={toggleColorAndTrimModalVisible} />
        </div>

        <div className="-container">
          <ImageV2
            quality={60}
            objectFit="cover"
            lazyLoad
            src={image?.imageUrls?.[0] || ''}
            alt={data?.derivativeInfo?.manufacturer.name}
            plain
          />
        </div>
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
