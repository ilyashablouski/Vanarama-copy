/* eslint-disable import/prefer-default-export */
import { CreditApplicationInputObject } from '../../generated/globalTypes';

export const formValuesToInputCreditApplication = (
  creditApp: CreditApplicationInputObject,
): CreditApplicationInputObject => {
  return {
    orderUuid: creditApp.orderUuid,
    status: creditApp.status,
    addresses: creditApp.addresses,
    bankAccountsV2: creditApp.bankAccountsV2,
    employmentHistories: creditApp.employmentHistories,
    incomeAndExpenses: creditApp.incomeAndExpenses,
    leadManagerProposalId: creditApp.leadManagerProposalId,
    aboutDetailsV2: creditApp.aboutDetailsV2,
    companyDetailsV2: creditApp.companyDetailsV2,
    vatDetails: creditApp.vatDetails,
    directorsDetails: creditApp.directorsDetails,
    soleTraderDetails: creditApp.soleTraderDetails,
    creditApplicationType: creditApp.creditApplicationType,
  };
};
