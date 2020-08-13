import { gql } from '@apollo/client';
import FinanceExplainedContainer from '../../containers/FinanceExplainedContainer/FinanceExplainedContainer';

export const CAR_LEASING_EXPLAINED_CONTENT = gql`
  query CarLeasingExplainedPage {
    genericPage(slug: "/car-leasing-finance-options") {
      id
      body
      metaData {
        title
        name
        pageType
      }
      sections {
        ...FinanceExplainedContainerSections
      }
    }
  }
  ${FinanceExplainedContainer.fragments.sections}
`;

export const VAN_LEASING_EXPLAINED_CONTENT = gql`
  query VanLeasingExplainedPage {
    genericPage(slug: "/finance-info/van-finance-options") {
      id
      body
      metaData {
        title
        name
        pageType
      }
      sections {
        ...FinanceExplainedContainerSections
      }
    }
  }
  ${FinanceExplainedContainer.fragments.sections}
`;
