import React, { Dispatch, SetStateAction } from 'react';
import Drawer from 'core/molecules/drawer/Drawer';
import { ISelectedVehicle } from '../interfaces';
import { DERANGED_FORM_DEFAULT_VALUES } from '../constants';
import DerangedForm from './DerangedForm';

interface IDerangedModalForm {
  isShowDrawer: boolean;
  setIsShowDrawer: Dispatch<SetStateAction<boolean>>;
  isFormSend: boolean;
  setIsFormSend: Dispatch<SetStateAction<boolean>>;
  selectedVehicle: ISelectedVehicle;
  setSelectedVehicle: Dispatch<SetStateAction<ISelectedVehicle>>;
}

const DerangedModal: React.FC<IDerangedModalForm> = ({
  isFormSend,
  setIsFormSend,
  isShowDrawer,
  setIsShowDrawer,
  selectedVehicle,
  setSelectedVehicle,
}) => {
  const onCloseDrawer = () => {
    if (isFormSend) {
      setSelectedVehicle(DERANGED_FORM_DEFAULT_VALUES);
    }
    setIsFormSend(false);
    setIsShowDrawer(false);
  };

  return (
    <Drawer
      onCloseDrawer={onCloseDrawer}
      isShowDrawer={isShowDrawer}
      title="Please Fill In Your Details"
      renderContent={
        <DerangedForm
          isFormSend={isFormSend}
          setIsFormSend={setIsFormSend}
          selectedVehicle={selectedVehicle}
        />
      }
    />
  );
};

export default React.memo(DerangedModal);
