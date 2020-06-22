import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import ExpensesFormContainer from '../../../containers/ExpensesFormContainer/ExpensesFormContainer';
import OLAFLayout from '../../../layouts/OLAFLayout/OLAFLayout';
import withApollo from '../../../hocs/withApollo';
import { getUrlParam } from '../../../utils/url';

const ExpensesPage: NextPage = () => {
  const router = useRouter();
  const {
    query: { uuid, derivativeId, orderId },
  } = router;
  return (
    <OLAFLayout
      orderId={orderId as string}
      derivativeId={derivativeId as string}
    >
      <ExpensesFormContainer
        onCompleted={() => {
          const url =
            router.query.redirect === 'summary'
              ? `/olaf/summary/[uuid]${getUrlParam({ orderId, derivativeId })}`
              : `/olaf/bank-details/[uuid]${getUrlParam({
                  orderId,
                  derivativeId,
                })}`;

          router.push(url, url.replace('[uuid]', uuid as string));
        }}
        personUuid={uuid as string}
      />
    </OLAFLayout>
  );
};

export default withApollo(ExpensesPage, { getDataFromTree });
