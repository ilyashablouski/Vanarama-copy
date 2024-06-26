import localforage from 'localforage';

interface ISavePersonEmailArgs {
  email: string | null;
}

export default function savePersonEmail(
  rootValue: unknown,
  args: ISavePersonEmailArgs,
) {
  return localforage.setItem<string | null>('personEmail', args.email);
}
