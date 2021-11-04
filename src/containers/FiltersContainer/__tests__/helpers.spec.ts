import preloadAll from 'jest-next-dynamic';
import {
  findPreselectFilterValue,
  getValueKey,
  tagArrayBuilderHelper,
} from '../helpers';
import { FilterFields } from '../config';
import { filterList_filterList } from '../../../../generated/filterList';

const selectedFiltersState = {
  bodyStyles: [],
  transmissions: [],
  fuelTypes: [],
  manufacturer: [],
  model: [],
  from: [],
  to: [],
};

describe('<helpers />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('should work with value', async () => {
    expect(findPreselectFilterValue('test', ['test'])).toEqual('test');
  });
  it('should work when data null', async () => {
    expect(findPreselectFilterValue('test', null)).toEqual('');
  });
  it('getValueKey should return correct filter name', async () => {
    expect(
      getValueKey('test', { ...selectedFiltersState, manufacturer: ['Test'] }),
    ).toEqual('manufacturer');
  });
  it('tagArrayBuilderHelper works correct', () => {
    expect(
      tagArrayBuilderHelper(
        [FilterFields.from, ['150']],
        {} as filterList_filterList,
        {
          isPartnershipActive: false,
        },
      ),
    ).toMatchObject({ order: 3, value: '£150' });
  });
  it('model in model page should not to be added', () => {
    expect(
      tagArrayBuilderHelper(
        [FilterFields.model, ['Octavia']],
        {} as filterList_filterList,
        { isPartnershipActive: false, isModelPage: true },
      ),
    ).toMatchObject({ order: 2, value: '' });
  });
  it('model in range page should not to be added', () => {
    expect(
      tagArrayBuilderHelper(
        [FilterFields.model, ['Octavia']],
        {} as filterList_filterList,
        { isPartnershipActive: false, isRangePage: true },
      ),
    ).toMatchObject({ order: 2, value: '' });
  });
  it('bodyStyles in body page should not to be added', () => {
    expect(
      tagArrayBuilderHelper(
        [FilterFields.bodyStyles, ['Hatchback']],
        {} as filterList_filterList,
        { isPartnershipActive: false, isBodyStylePage: true },
      ),
    ).toMatchObject({ order: 5, value: '' });
  });
  it('fuels for active partnership should not to be added', () => {
    expect(
      tagArrayBuilderHelper(
        [FilterFields.fuelTypes, ['Petrol']],
        {} as filterList_filterList,
        { isPartnershipActive: true },
      ),
    ).toMatchObject({ order: 7, value: '' });
  });
  it('for make and model we should get label value', () => {
    expect(
      tagArrayBuilderHelper(
        [FilterFields.model, ['Fabia']],
        {} as filterList_filterList,
        {
          isPartnershipActive: false,
        },
      ),
    ).toMatchObject([{ order: 2, value: 'Fabia' }]);
  });
});
