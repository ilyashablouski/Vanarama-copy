import clonedeep from 'lodash.clonedeep';

export function encodeData(data: any) {
  const newData = clonedeep(data);

  modifyObjectStringValues({
    object: newData,
    modify: encodeString,
  });

  return newData;
}

export function decodeData(data: any) {
  const newData = clonedeep(data);

  modifyObjectStringValues({
    object: newData,
    modify: decodeString,
  });

  return newData;
}

export function encodeString(text: any) {
  return Buffer.from(text).toString('base64');
}

export function decodeString(base64Text: any) {
  return Buffer.from(base64Text, 'base64').toString('ascii');
}

export function modifyObjectStringValues({ object, modify }: any) {
  Object.keys(object).forEach(key => {
    if (typeof object[key] === 'object' && object[key] !== null) {
      modifyObjectStringValues({ object: object[key], modify });
    } else if (
      !['__typename', 'id'].includes(key) &&
      typeof object[key] === 'string'
    ) {
      // eslint-disable-next-line no-param-reassign
      object[key] = modify(object[key]);
    }
  });
}
