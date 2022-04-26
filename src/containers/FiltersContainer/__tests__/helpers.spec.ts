import preloadAll from 'jest-next-dynamic';
import {
  findPreselectFilterValue,
  getManualBodyStyle,
  getValueKey,
  tagArrayBuilderHelper,
} from '../helpers';
import { FilterFields } from '../config';
import { filterList_filterList } from '../../../../generated/filterList';
import { SearchPageTypes } from '../../SearchPageContainer/interfaces';
import { bodyUrlsSlugMapper } from '../../SearchPageContainer/helpers';

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
  it('should tagArrayBuilderHelper works correct', () => {
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
  it('should not to be added model in model page', () => {
    expect(
      tagArrayBuilderHelper(
        [FilterFields.model, ['Octavia']],
        {} as filterList_filterList,
        { isPartnershipActive: false, isModelPage: true },
      ),
    ).toMatchObject({ order: 2, value: '' });
  });
  it('should not to be added model in range page', () => {
    expect(
      tagArrayBuilderHelper(
        [FilterFields.model, ['Octavia']],
        {} as filterList_filterList,
        { isPartnershipActive: false, isRangePage: true },
      ),
    ).toMatchObject({ order: 2, value: '' });
  });
  it('should not to be added bodyStyles in body page', () => {
    expect(
      tagArrayBuilderHelper(
        [FilterFields.bodyStyles, ['Hatchback']],
        {} as filterList_filterList,
        { isPartnershipActive: false, isBodyStylePage: true },
      ),
    ).toMatchObject({ order: 5, value: '' });
  });
  it('should not to be added fuels for active partnership', () => {
    expect(
      tagArrayBuilderHelper(
        [FilterFields.fuelTypes, ['Petrol']],
        {} as filterList_filterList,
        { isPartnershipActive: true },
      ),
    ).toMatchObject({ order: 7, value: '' });
  });
  it('should get label value for make and model', () => {
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
  it('getManualBodyStyle should return correct value', () => {
    expect(
      getManualBodyStyle({
        isPickups: true,
      }),
    ).toEqual(['Pickup']);
    expect(getManualBodyStyle({})).toEqual(['']);
    expect(
      getManualBodyStyle({
        query: { bodyStyles: 'estate' },
        pageType: SearchPageTypes.MODEL_PAGE,
      }),
    ).toEqual([bodyUrlsSlugMapper.estate]);
    expect(
      getManualBodyStyle({
        query: { bodyStyles: 'test' },
        pageType: SearchPageTypes.MODEL_PAGE,
      }),
    ).toEqual(['test']);
    expect(
      getManualBodyStyle({
        query: { dynamicParam: '' },
        pageType: SearchPageTypes.BUDGET_PAGE,
        preLoadBodyStyles: [''],
      }),
    ).toEqual(['']);
    expect(
      getManualBodyStyle({
        query: { dynamicParam: 'crew' },
        pageType: SearchPageTypes.BODY_STYLE_PAGE,
      }),
    ).toEqual(['']);
    expect(
      getManualBodyStyle({
        query: { dynamicParam: 'crew' },
        pageType: SearchPageTypes.BODY_STYLE_PAGE,
        preLoadBodyStyles: ['Crew', 'Dropside Tipper', 'Large Van'],
      }),
    ).toEqual(['Crew']);
  });
});
