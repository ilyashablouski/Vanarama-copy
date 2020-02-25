import { useRouter } from 'next/router';
import Link from 'next/link';

const EmploymentHistoryPage = () => {
  return (
    <>
      <h1>Employment History</h1>

      <Link href="/olaf/expenses">
        <a>Next</a>
      </Link>
    </>
  );
};

export default EmploymentHistoryPage;
