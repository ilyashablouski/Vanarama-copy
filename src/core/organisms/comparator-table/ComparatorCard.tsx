import React from 'react';
import { IComparatorCard } from './interface';
import CloseSharp from '../../assets/icons/CloseSharp';
import AddSharp from '../../assets/icons/AddSharp';
import Icon from '../../atoms/icon';
import Button from '../../atoms/button';
import Heading from '../../atoms/heading';
import Text from '../../atoms/text';
import Card from '../../molecules/cards';

const ComporatorCard: React.FC<IComparatorCard> = ({
  dataTestId,
  headingValue,
  number,
  addVehicle,
  deleteVehicle,
}) => {
  return (
    <Card
      data-testid={dataTestId}
      className={!headingValue ? '-skeleton' : ''}
      imageSrc={headingValue?.image}
      title={{
        title: headingValue?.name || '',
        description: headingValue?.description || '',
      }}
    >
      {headingValue ? (
        <>
          <button
            data-testid={`del-compare-${number}`}
            onClick={() => {
              deleteVehicle();
            }}
            type="button"
            className="corner-button"
          >
            <Icon color="white" icon={<CloseSharp />} />
          </button>
        </>
      ) : (
        <>
          <div className="card-image">
            <Button
              color="teal"
              size="regular"
              fill="solid"
              iconColor="white"
              onClick={addVehicle}
              iconPosition="before"
              icon={<AddSharp />}
              label="Add Vehicle"
            />
          </div>
          <div className="title">
            <Heading size="lead" color="black">
              {`Vehicle ${number}`}
            </Heading>
            <Text size="xsmall" color="dark">
              —
            </Text>
          </div>
        </>
      )}
    </Card>
  );
};

export default ComporatorCard;
