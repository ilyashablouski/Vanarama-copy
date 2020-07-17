import { modelHandler, getBudgetForQuery } from '../helpers';

describe('<helpers />', () => {
  it('modelHandler should return empty array ', async () => {
    expect(
      modelHandler(
        {
          groupedRanges: null,
          vehicleTypes: null,
          bodyStyles: null,
          transmissions: null,
          fuelTypes: null,
        },
        '',
      ),
    ).toEqual([]);
  });
  it('modelHandler should return childrens array ', async () => {
    expect(
      modelHandler(
        {
          groupedRanges: [
            {
              parent: 'Citroën',
              children: ['Berlingo', 'Dispatch', 'Relay'],
            },
            {
              parent: 'Dacia',
              children: ['Duster'],
            },
            {
              parent: 'BMW',
              children: ['3 series', '4 series'],
            },
          ],
          vehicleTypes: null,
          bodyStyles: null,
          transmissions: null,
          fuelTypes: null,
        },
        'BMW',
      ),
    ).toEqual(['3 series', '4 series']);
  });
  it('getBudgetForQuery should return empty string', async () => {
    expect(getBudgetForQuery('')).toEqual('');
  });
  it('getBudgetForQuery should return valid value', async () => {
    expect(getBudgetForQuery('£150-£250')).toEqual('150|250');
  });
});
