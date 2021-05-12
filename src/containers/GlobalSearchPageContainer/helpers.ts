import { fullTextSearchVehicleList_fullTextSearchVehicleList_vehicles as IVehiclesList } from '../../../generated/fullTextSearchVehicleList';
import { AVAILABILITY_LABELS } from '../HelpMeChooseContainer/HelpMeChooseBlocks/HelpMeChooseResult';
import { GetProductCard_productCard as ICard } from '../../../generated/GetProductCard';

// eslint-disable-next-line import/prefer-default-export
export const productCardDataMapper = (data: IVehiclesList): ICard => ({
  vehicleType: data.vehicleType,
  capId: data.capId,
  manufacturerName: data.manufacturerName,
  rangeName: data.rangeName,
  modelName: data.modelName,
  derivativeName: data.derivativeName,
  averageRating: data.financeProfiles?.[0].rate || null,
  isOnOffer: data.onOffer,
  offerPosition: data.offerRanking,
  leadTime: AVAILABILITY_LABELS[data.availability ?? ''],
  imageUrl: '',
  keyInformation: null,
  businessRate: data.rental,
  personalRate: data.rental,
});
