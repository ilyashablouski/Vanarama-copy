import localForage from 'localforage';

export default function useGetSetBankUUid() {
  return {
    setBankUuid(id: string) {
      localForage.setItem('bankUuid', id);
    },
    async getBankUuid(): Promise<string> {
      try {
        return (await localForage.getItem('bankUuid')) as string;
      } catch {
        return '';
      }
    },
  };
}
