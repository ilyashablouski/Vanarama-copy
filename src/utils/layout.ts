// eslint-disable-next-line import/prefer-default-export
export function getFeaturedClassPartial(featured: any) {
  if (featured?.layout?.includes('Default')) {
    return 'bg-default';
  }
  if (featured?.layout?.includes('Full Width')) {
    return 'featured-fullwidth';
  }
  return featured?.layout?.includes('Media Left')
    ? 'featured-left'
    : 'featured-right';
}
