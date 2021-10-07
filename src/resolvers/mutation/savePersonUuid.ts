import localforage from 'localforage';

interface ISavePersonArgs {
  uuid: string | null;
}

export default function savePersonUuid(
  rootValue: unknown,
  args: ISavePersonArgs,
) {
  if (typeof window !== 'undefined') {
    return localforage.setItem<string | null>('personUuid', args.uuid);
  }

  return null;
}
