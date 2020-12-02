// eslint-disable-next-line import/prefer-default-export
export const mockSearchPodResponse = {
  filterList: {
    vehicleTypes: ['LCV'],
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
    ],
    bodyStyles: ['Dropside Tipper', 'Large Van'],
  },
};
