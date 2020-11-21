import { modelHandler, getBudgetForQuery } from '../helpers';

describe('<helpers />', () => {
  it('modelHandler should return empty array ', async () => {
    expect(
      modelHandler(
        {
          groupedRangesWithSlug: null,
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
          groupedRangesWithSlug: [
            {
              parent: { label: 'Citroën', slug: 'Citroën' },
              children: [
                { label: 'Berlingo', slug: 'Berlingo' },
                { label: 'Dispatch', slug: 'Dispatch' },
                { label: 'Relay', slug: 'Relay' },
              ],
            },
            {
              parent: { label: 'Dacia', slug: 'Dacia' },
              children: [{ label: 'Duster', slug: 'Duster' }],
            },
            {
              parent: { label: 'BMW', slug: 'BMW' },
              children: [
                { label: '3 series', slug: '3 series' },
                { label: '4 series', slug: '4 series' },
              ],
            },
          ],
          vehicleTypes: null,
          bodyStyles: null,
          transmissions: null,
          fuelTypes: null,
        },
        'BMW',
      ),
    ).toEqual([
      {
        label: '3 series',
        slug: '3 series',
      },
      {
        label: '4 series',
        slug: '4 series',
      },
    ]);
  });
  it('getBudgetForQuery should return empty string', async () => {
    expect(getBudgetForQuery('')).toEqual('');
  });
  it('getBudgetForQuery should return valid value', async () => {
    expect(getBudgetForQuery('£150-£250')).toEqual('150|250');
  });
});
