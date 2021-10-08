import localforage from 'localforage';

interface ISavePersonUuidArgs {
  uuid: string | null;
}

export default function savePersonUuid(
  rootValue: unknown,
  args: ISavePersonUuidArgs,
) {
  return localforage.setItem<string | null>('personUuid', args.uuid);
}
