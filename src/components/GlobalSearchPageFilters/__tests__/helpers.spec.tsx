import {
  renderBudgetValue,
  renderBudgetSelected,
  renderPowerEngineSelected,
  renderPowerEngineValue,
  generateQueryObject,
  renderDoorsValue,
  renderSeatsValue,
  buildEnginePowerValues,
  renderMakeAndModelSelected,
} from '../helpers';
import { IFiltersData } from '../../../containers/GlobalSearchPageContainer/interfaces';

describe('helpers', () => {
  it('renderBudgetValue should return correct budget value', () => {
    expect(renderBudgetValue('300')).toEqual('£300');
  });
  it('renderPowerEngineValue should return correct power value', () => {
    expect(renderPowerEngineValue('300')).toEqual('300bhp');
  });
  it('renderDoorsValue should return correct doors value', () => {
    expect(renderDoorsValue('3')).toEqual('3 Doors');
  });
  it('renderSeatsValue should return correct seats value', () => {
    expect(renderSeatsValue('3')).toEqual('3 Seats');
  });
  it('renderMakeAndModelSelected should return correct seats value', () => {
    expect(
      renderMakeAndModelSelected(['BMW', '3 Series', 'Audi', '', 'Ford']),
    ).toEqual('BMW 3 Series, Audi, Ford,');
  });
  it('generateQueryObject should return correct query object', () => {
    expect(
      generateQueryObject({
        bodyStyles: ['Hatchback'],
        from: ['150'],
        to: ['550'],
        fromEnginePower: [160],
        toEnginePower: [240],
      } as IFiltersData),
    ).toEqual({
      bodyStyles: ['Hatchback'],
      budget: '150|550',
      enginePowerBhp: '160|240',
    });
  });
  it('buildEnginePowerValues should create array of engine power values', () => {
    expect(buildEnginePowerValues(280, 280)).toEqual([280, 300]);
    expect(buildEnginePowerValues(120, 187)).toEqual([120, 140, 160, 180, 200]);
    expect(buildEnginePowerValues(187, 187)).toEqual([180, 200]);
  });
  describe('renderBudgetSelected', () => {
    it('renderBudgetSelected should return correct selected string with only From value', () => {
      expect(renderBudgetSelected(['300'])).toEqual('From £300');
    });
    it('renderBudgetSelected should return correct selected string with only To value', () => {
      expect(renderBudgetSelected([null, '300'])).toEqual('To £300');
    });
    it('renderBudgetSelected should return correct selected string with both value', () => {
      expect(renderBudgetSelected(['150', '300'])).toEqual('From £150 to £300');
    });
  });
  describe('renderPowerEngineSelected', () => {
    it('renderBudgetSelected should return correct selected string with only From value', () => {
      expect(renderPowerEngineSelected(['300'])).toEqual('From 300bhp');
    });
    it('renderBudgetSelected should return correct selected string with only To value', () => {
      expect(renderPowerEngineSelected([null, '300'])).toEqual('To 300bhp');
    });
    it('renderBudgetSelected should return correct selected string with both value', () => {
      expect(renderPowerEngineSelected(['150', '300'])).toEqual(
        'From 150bhp to 300bhp',
      );
    });
  });
});
