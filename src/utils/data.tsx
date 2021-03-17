import clonedeep from 'lodash.clonedeep';

const ENCODED_KEY_PREFIX = '__b64__';
const KEYS_TO_ENCODE = ['schema'];
const VALUES_TO_ENCODE = ['body'];

export function encodeData(data: any) {
  const newData = clonedeep(data);

  modifyObjectStringValues({
    object: newData,
    modify: encodeString,
    keysToEncode: KEYS_TO_ENCODE,
    valuesToEncode: VALUES_TO_ENCODE,
  });

  return newData;
}

export function decodeData(data: any) {
  const newData = clonedeep(data);

  modifyObjectStringValues({
    object: newData,
    modify: decodeString,
    keysToEncode: KEYS_TO_ENCODE,
    valuesToEncode: VALUES_TO_ENCODE,
  });

  return newData;
}

export function encodeString(text: any) {
  return Buffer.from(text).toString('base64');
}

export function decodeString(base64Text: any) {
  return Buffer.from(base64Text, 'base64').toString('utf-8');
}

function modifyKey({ key, modify }: { key: string; modify: Function }) {
  // Decode key
  if (key.includes(ENCODED_KEY_PREFIX)) {
    return modify(key);
  }

  // Encode key
  if (!key.includes(ENCODED_KEY_PREFIX)) {
    return `${ENCODED_KEY_PREFIX}${modify(key)}`;
  }

  return key;
}

export function modifyObjectStringValues({
  object,
  modify,
  keysToEncode,
  valuesToEncode,
}: any) {
  Object.keys(object).forEach(key => {
    // Encode and decode object keys that we don't want to expose to Googlebot
    if (keysToEncode.includes(key)) {
      const modifiedKey = modifyKey({ key, modify });
      // eslint-disable-next-line no-param-reassign
      object[modifiedKey] = object[key];
      // eslint-disable-next-line no-param-reassign
      delete object[key];
    }

    // Encode and decode object values that we don't want to expose to Googlebot
    if (typeof object[key] === 'object' && object[key] !== null) {
      modifyObjectStringValues({
        object: object[key],
        modify,
        keysToEncode,
        valuesToEncode,
      });
    } else if (
      valuesToEncode.includes(key) &&
      typeof object[key] === 'string'
    ) {
      // eslint-disable-next-line no-param-reassign
      object[key] = modify(object[key]);
    }
  });
}
