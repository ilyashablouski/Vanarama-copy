import clonedeep from 'lodash.clonedeep';

const ENCODED_KEY_PREFIX = '__b64__';
const KEYS_TO_ENCODE = ['schema'] as any;
const VALUES_TO_ENCODE = [] as any;

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

function isEncodedKey(key: string) {
  return key.includes(ENCODED_KEY_PREFIX);
}

function modifyKey({ key, modify }: { key: string; modify: Function }) {
  // Decode key
  if (isEncodedKey(key)) {
    const keyWithoutPrefix = key.split(ENCODED_KEY_PREFIX)[1];

    return modify(keyWithoutPrefix);
  }

  // Encode key
  return `${ENCODED_KEY_PREFIX}${modify(key)}`;
}

function isKeyIncludedIn(key: string, keysToEncodeOrDecode: String[]) {
  if (isEncodedKey(key)) {
    const keyWithoutPrefix = key.split(ENCODED_KEY_PREFIX)[1];

    return keysToEncodeOrDecode.includes(decodeString(keyWithoutPrefix));
  }

  return keysToEncodeOrDecode.includes(key);
}

export function modifyObjectStringValues({
  object,
  modify,
  keysToEncode,
  valuesToEncode,
}: any) {
  Object.keys(object).forEach(key => {
    // Encode and decode object keys that we don't want to expose to Googlebot
    if (isKeyIncludedIn(key, keysToEncode)) {
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
