import { useRouter } from 'next/router';
import Link from 'next/link';

const AddressHistoryPage = () => {
  return (
    <>
      <h1>Address History</h1>

      <Link href="/olaf/employment_history">
        <a>Next</a>
      </Link>
    </>
  );
};

export default AddressHistoryPage;
