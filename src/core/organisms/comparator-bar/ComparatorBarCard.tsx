import React from 'react';
import cx from 'classnames';
import { IComparatorBarCard } from './interface';
import Heading from '../../atoms/heading';
import Text from '../../atoms/text';
import CloseSharp from '../../assets/icons/CloseSharp';
import Icon from '../../atoms/icon';

const ComporatorBar: React.FC<IComparatorBarCard> = ({
  dataTestId,
  dataUiTestId,
  deleteVehicle,
  number,
  vehicle,
}) => {
  return (
    <div
      className={cx('card', !vehicle ? '-skeleton' : '')}
      data-testid={dataTestId}
      data-uitestid={`${dataUiTestId}-${!vehicle ? 'absent' : 'present'}`}
    >
      {!vehicle ? (
        <>
          <Heading size="lead" color="black">{`Vehicle ${number}`}</Heading>
          <Text size="xsmall" color="dark">
            —
          </Text>
        </>
      ) : (
        <>
          <Heading
            size="lead"
            color="black"
          >{`${vehicle.manufacturerName} ${vehicle.rangeName}`}</Heading>
          <Text size="xsmall" color="dark">
            {vehicle.derivativeName}
          </Text>
          <button
            onClick={() => deleteVehicle()}
            type="button"
            data-testid={`comparatorBar-delete-${number}`}
            data-uitestid={`comparator-bar-vehicle_card-remove-button-${number}`}
            className="corner-button"
          >
            <Icon color="white" icon={<CloseSharp />} />
          </button>
        </>
      )}
    </div>
  );
};

export default ComporatorBar;
