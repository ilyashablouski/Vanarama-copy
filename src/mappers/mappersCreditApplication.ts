/* eslint-disable import/prefer-default-export */
import { CreditApplicationInputObject } from '../../generated/globalTypes';

export const formValuesToInputCreditApplication = (
  creditApp: CreditApplicationInputObject,
): CreditApplicationInputObject => {
  return {
    orderUuid: creditApp.orderUuid,
    status: creditApp.status,
    addresses: creditApp.addresses,
    bankAccounts: creditApp.bankAccounts,
    employmentHistories: creditApp.employmentHistories,
    incomeAndExpenses: creditApp.incomeAndExpenses,
    leadManagerProposalId: creditApp.leadManagerProposalId,
    aboutDetails: creditApp.aboutDetails,
    companyDetails: creditApp.companyDetails,
    vatDetails: creditApp.vatDetails,
    directorsDetails: creditApp.directorsDetails,
    soleTraderDetails: creditApp.soleTraderDetails,
    B2C_PERSONAL: creditApp.B2C_PERSONAL,
  };
};
