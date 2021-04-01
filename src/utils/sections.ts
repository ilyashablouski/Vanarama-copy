// eslint-disable-next-line import/prefer-default-export
export const getFeaturedSectionsAsArray = (sectionObject: any) => {
  let featuresArray: any = [];
  Object.keys(sectionObject).map(x => {
    if (x.includes('featured') && sectionObject[x]) {
      featuresArray.push(sectionObject[x]);
    }
  });
  return featuresArray;
};
