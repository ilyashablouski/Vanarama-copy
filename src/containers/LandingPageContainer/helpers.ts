import {
  GenericPageQuery_genericPage_sectionsAsArray,
  GenericPageQuery_genericPage_sectionsAsArray_accordion,
  GenericPageQuery_genericPage_sectionsAsArray_cards,
  GenericPageQuery_genericPage_sectionsAsArray_carousel,
  GenericPageQuery_genericPage_sectionsAsArray_faqs,
  GenericPageQuery_genericPage_sectionsAsArray_featured,
  GenericPageQuery_genericPage_sectionsAsArray_hero,
  GenericPageQuery_genericPage_sectionsAsArray_iconBullets,
  GenericPageQuery_genericPage_sectionsAsArray_jumpMenu,
  GenericPageQuery_genericPage_sectionsAsArray_leadText,
  GenericPageQuery_genericPage_sectionsAsArray_questionSet,
  GenericPageQuery_genericPage_sectionsAsArray_reviews,
  GenericPageQuery_genericPage_sectionsAsArray_rowText,
  GenericPageQuery_genericPage_sectionsAsArray_steps,
  GenericPageQuery_genericPage_sectionsAsArray_tiles,
} from '../../../generated/GenericPageQuery';

type BlockName = {
  blockName: keyof GenericPageQuery_genericPage_sectionsAsArray;
};

type BlocksType =
  | GenericPageQuery_genericPage_sectionsAsArray_reviews
  | GenericPageQuery_genericPage_sectionsAsArray_accordion
  | GenericPageQuery_genericPage_sectionsAsArray_carousel
  | GenericPageQuery_genericPage_sectionsAsArray_cards
  | GenericPageQuery_genericPage_sectionsAsArray_faqs
  | GenericPageQuery_genericPage_sectionsAsArray_featured
  | GenericPageQuery_genericPage_sectionsAsArray_hero
  | GenericPageQuery_genericPage_sectionsAsArray_iconBullets
  | GenericPageQuery_genericPage_sectionsAsArray_jumpMenu
  | GenericPageQuery_genericPage_sectionsAsArray_leadText
  | GenericPageQuery_genericPage_sectionsAsArray_rowText
  | GenericPageQuery_genericPage_sectionsAsArray_steps
  | GenericPageQuery_genericPage_sectionsAsArray_tiles
  | GenericPageQuery_genericPage_sectionsAsArray_questionSet;

type RenderElement = BlockName & BlocksType;

// eslint-disable-next-line import/prefer-default-export
export const buildRenderArray = (
  sectionsArray: GenericPageQuery_genericPage_sectionsAsArray,
): RenderElement[] => {
  const blocksLength = Object.values(sectionsArray)
    .flat()
    .filter(value => value).length;
  const featuredBlockValues = [...sectionsArray.featured!];
  const renderArray: RenderElement[] = new Array(blocksLength).fill(undefined);

  for (let i = 0; i < blocksLength; i += 1) {
    let iterations = 0;
    // Try to find element for current position
    Object.entries(sectionsArray).some(([key, elements]) => {
      iterations += 1;
      if (!elements) {
        return false;
      }
      const elementOnPosition = elements?.find(
        (element: any) => element?.position === i,
      ) as BlocksType;
      if (elementOnPosition) {
        renderArray.splice(i, 1, {
          blockName: key as keyof GenericPageQuery_genericPage_sectionsAsArray,
          ...elementOnPosition,
        });
      }
      return !!elementOnPosition;
    });
    // If we could not find element for the current position -> put next available featured element to renderArray
    if (iterations === Object.keys(sectionsArray).length && !renderArray[i]) {
      renderArray.splice(i, 1, {
        blockName: 'featured',
        ...featuredBlockValues?.splice(0, 1)[0]!,
      });
    }
  }
  return renderArray;
};
