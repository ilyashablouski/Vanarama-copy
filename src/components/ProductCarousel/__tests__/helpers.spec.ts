import { features } from '../helpers';

describe('<helpers />', () => {
  it('features should return array with icon', () => {
    expect(
      features(
        [
          { name: 'name', value: 'value' },
          { name: 'name_1', value: 'value_1' },
          { name: 'name_2', value: 'value_2' },
        ],
        'id',
      ),
    ).toEqual([
      {
        icon: null,
        label: 'value',
        index: 'id_name',
      },
      {
        icon: null,
        label: 'value_1',
        index: 'id_name_1',
      },
      {
        icon: null,
        label: 'value_2',
        index: 'id_name_2',
      },
    ]);
  });
});
