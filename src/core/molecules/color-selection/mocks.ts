import { GetImacaAssets_getImacaAssets_colours as IColour } from '../../../../generated/GetImacaAssets';
import { OnOffer } from '../../../../entities/global';

export const hotOfferColorList = [
  {
    capId: 97341,
    imacaName: 'Hot White (K8J2)',
    lqName: 'Hot White (K8J2)',
    hex: 'ffffff',
    matchAccuracy: 1,
    onOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_TRUE,
  },
  {
    capId: 151235,
    imacaName: 'Hot Orange (K8J2)',
    lqName: 'Hot Orange (K8J2)',
    hex: 'ec6409',
    matchAccuracy: 1,
    onOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_TRUE,
  },
  {
    capId: 122994,
    imacaName: 'Hot Yellow (K8J2)',
    lqName: 'Hot Yellow (K8J2)',
    hex: 'f8bb20',
    matchAccuracy: 1,
    onOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_TRUE,
  },
] as IColour[];

export const factoryColorList = [
  {
    capId: 72751,
    imacaName: 'Factory Blue (K8J2)',
    lqName: 'Factory Blue (K8J2)',
    hex: '678098',
    matchAccuracy: 1,
    onOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_FALSE,
  },
  {
    capId: 72500,
    imacaName: 'Factory Gray (K8J2)',
    lqName: 'Factory Gray (K8J2)',
    hex: '44576a',
    matchAccuracy: 1,
    onOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_FALSE,
  },
  {
    capId: 72497,
    imacaName: 'Factory Red (K8J2)',
    lqName: 'Factory Red (K8J2)',
    hex: 'be2727',
    matchAccuracy: 1,
    onOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_FALSE,
  },
  {
    capId: 164510,
    imacaName: 'Factory Green (K8J2)',
    lqName: 'Factory Green (K8J2)',
    hex: '5eac35',
    matchAccuracy: 1,
    onOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_FALSE,
  },
  {
    capId: 138304,
    imacaName: 'Factory Black (K8J2)',
    lqName: 'Factory Black (K8J2)',
    hex: '0a0d10',
    matchAccuracy: 1,
    onOffer: OnOffer.FILTER_ENABLED_AND_SET_TO_FALSE,
  },
] as IColour[];
