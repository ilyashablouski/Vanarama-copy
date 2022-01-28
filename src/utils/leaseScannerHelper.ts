/* eslint-disable import/prefer-default-export */
import { isHitachiChangedName } from './helpers';

export const LEASING_PROVIDERS = [
  'LeasePlan',
  'Arval',
  'Lex',
  isHitachiChangedName() ? 'Novuna' : 'Hitachi',
  'ALD',
  'BNP Paribas',
  'Leasys',
  'Santander',
  'Toyota Finance',
  'Agility Fleet',
  'BlackHorse',
];
