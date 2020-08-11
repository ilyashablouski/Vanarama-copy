// eslint-disable-next-line import/prefer-default-export
export function getFeaturedClassPartial(featured: any) {
  return featured?.layout && featured.layout[0] === 'Media Left'
    ? 'featured-left'
    : 'featured-right';
}
