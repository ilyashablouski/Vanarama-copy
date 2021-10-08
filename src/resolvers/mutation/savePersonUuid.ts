import localforage from 'localforage';

interface ISavePersonUuidArgs {
  uuid: string | null;
}

export default function savePersonUuid(
  rootValue: unknown,
  args: ISavePersonUuidArgs,
) {
  if (typeof window !== 'undefined') {
    return localforage.setItem<string | null>('personUuid', args.uuid);
  }

  return null;
}
