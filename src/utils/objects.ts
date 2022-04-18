type AnyObject = Record<string, any>;

const isObjectsShallowEqual = (object1: AnyObject, object2: AnyObject) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  return keys1.every(key => object1[key] === object2[key]);
};

export default isObjectsShallowEqual;
