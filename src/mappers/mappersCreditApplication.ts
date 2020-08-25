/* eslint-disable import/prefer-default-export */
import { CreditApplicationInputObject } from '../../generated/globalTypes';

export const formValuesToInputCreditApplication = (
  creditApp: CreditApplicationInputObject,
): CreditApplicationInputObject => {
  return {
    orderUuid: creditApp.orderUuid,
    status: creditApp.status,
    emailAddresses: creditApp.emailAddresses,
    addresses: creditApp.addresses,
    bankAccounts: creditApp.bankAccounts,
    employmentHistories: creditApp.employmentHistories,
    incomeAndExpenses: creditApp.incomeAndExpenses,
    leadManagerProposalId: creditApp.leadManagerProposalId,
    partyDetails: creditApp.partyDetails,
    telephoneNumbers: creditApp.telephoneNumbers,
    aboutDetails: creditApp.aboutDetails,
    companyDetails: creditApp.companyDetails,
    vatDetails: creditApp.vatDetails,
    directorsDetails: creditApp.directorsDetails,
  };
};
