import { useQuery, DocumentNode } from '@apollo/client';

export const useImperativeQuery = (query: DocumentNode) => {
  const { refetch } = useQuery(query, { skip: true });

  const imperativelyCallQuery = (variables: any) => {
    return refetch(variables);
  };

  return imperativelyCallQuery;
};

export default useImperativeQuery;
