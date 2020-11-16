export const getBuckets = (data: any[], activeData: string[]) =>
  data.map(bucket => ({
    label: bucket.key,
    active: activeData.includes(bucket.key),
  }));

export default getBuckets;
