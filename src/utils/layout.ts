// eslint-disable-next-line import/prefer-default-export
export function getFeaturedClassPartial(layout: any) {
  if (layout?.includes('Full Width')) {
    return 'featured-fullwidth';
  }

  return layout?.includes('Media Left') ? 'featured-left' : 'featured-right';
}
