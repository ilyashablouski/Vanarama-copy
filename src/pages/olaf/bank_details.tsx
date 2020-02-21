import { useRouter } from 'next/router';
import Link from 'next/link';

const BankDetailsPage = () => {
  return (
    <>
      <h1>Bank Details</h1>

      <Link href="/olaf/summary">
        <a>Next</a>
      </Link>
    </>
  );
};
export default BankDetailsPage;
