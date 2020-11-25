import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useRouter } from 'next/router';
import withApollo from '../../hocs/withApollo';
import LeasingQuestionContainer from '../../containers/LeasingQuestionContainer/LeasingQuestionContainer';
import { useGenericPageQuestion } from '../../containers/LeasingQuestionContainer/gql';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { getSectionsData } from '../../utils/getSectionsData';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';

const LeasingQuestion: NextPage = () => {
  const router = useRouter();

  const { data, loading, error } = useGenericPageQuestion(
    router.asPath.slice(1),
  );

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!data?.genericPage) {
    return null;
  }

  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const body = getSectionsData(['intro', 'body'], data?.genericPage);
  const sections = getSectionsData(['sections'], data?.genericPage);
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  return (
    <>
      {breadcrumbsItems && (
        <div className="row:title">
          <Breadcrumb items={breadcrumbsItems} />
        </div>
      )}
      <LeasingQuestionContainer
        body={body}
        title={metaData?.name}
        sections={sections}
      />
    </>
  );
};

export default withApollo(LeasingQuestion, { getDataFromTree });
