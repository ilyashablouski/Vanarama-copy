import { useRouter } from 'next/router';
import Link from 'next/link';

const ExpensesPage = () => {
  return (
    <>
      <h1>Expenses</h1>

      <Link href="/olaf/summary">
        <a>Next</a>
      </Link>
    </>
  );
};

export default ExpensesPage;
