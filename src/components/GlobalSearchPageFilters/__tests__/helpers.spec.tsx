import {
  renderBudgetValue,
  renderBudgetSelected,
  renderPowerEngineSelected,
  renderPowerEngineValue,
} from '../helpers';

describe('helpers', () => {
  it('renderBudgetValue should return correct budget value', () => {
    expect(renderBudgetValue('300')).toEqual('£300');
  });
  it('renderPowerEngineValue should return correct power value', () => {
    expect(renderPowerEngineValue('300')).toEqual('300bhp');
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
