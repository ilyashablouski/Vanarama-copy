// eslint-disable-next-line import/prefer-default-export
export const getFeaturedSectionsAsArray = (sectionObject: any) => {
  const featuresArray: any = [];
  const sectionKeys = Object.keys(sectionObject).filter(key =>
    key.includes('featured'),
  );
  sectionKeys.forEach(elem => {
    if (sectionObject[elem]) featuresArray.push(sectionObject[elem]);
  });
  return featuresArray;
};
