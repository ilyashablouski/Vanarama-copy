import { useRouter } from 'next/router';

export default function useSoleTraderJourney(): boolean {
  const router = useRouter();
  const soleTraderPathMatchResult = router.pathname.match(
    /^\/b2b\/olaf\/sole-trader\/.+/,
  );

  return (soleTraderPathMatchResult || []).length > 0;
}
