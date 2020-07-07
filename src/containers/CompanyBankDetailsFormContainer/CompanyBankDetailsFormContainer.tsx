import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import React from 'react';
import CompanyBankDetails from '../../components/CompanyBankDetails';
import { /* useBankDetails, */ useUpdateBankDetails } from './gql';
import { IProps } from './interfaces';
import { formValuesToInput } from './mappers';

// type QueryParams = OLAFQueryParams & {
//   companyUuid: string;
// };

// export const CompanyBankDetailsPage: NextPage = () => {
//   const router = useRouter();
//   const { companyUuid } = router.query as QueryParams;
//   const updateBankDetails = useUpdateBankDetails();

//   return (
//     <OLAFLayout>
//       <CompanyBankDetails
//         onSubmit={async ({ accountNumber, accountName, sortCode, joinedAt }) => {
//           // onSubmit={async ({ markets, outsideUK, vatNumber, vatRegistered }) => {
//           await updateBankDetails({
//             variables: {
//               input: {
//                 uuid: companyUuid,
//                 bankAccount: {
//                   accountName: accountName,
//                   accountNumber: accountNumber,
//                   sortCode: sortCode,
//                   joinedAt: joinedAt,
//                 }
//               },
//             },
//           });
//         }}
//       />
//     </OLAFLayout>
//   );
// };

// export default withApollo(CompanyBankDetailsPage, { getDataFromTree });

const CompanyBankDetailsFormContainer: React.FC<IProps> = ({
  companyUuid,
  onCompleted,
}) => {
  // const { loading, error, data } = useBankDetails(companyUuid);
  // console.log('loading', loading);
  // console.log('error', error);
  // console.log('data', data);
  const updateBankDetails = useUpdateBankDetails(companyUuid, onCompleted);
  // const [updateBankDetails] = useUpdateBankDetails(personUuid, onCompleted);
  // if (loading) {
  //   return <Loading size="large" />;
  // }

  // if (error) {
  //   return <p>Error: {error.message}</p>;
  // }

  // if (!data || !data.personByUuid) {
  //   return null;
  // }

  // const { bankAccounts, partyId } = data.personByUuid;
  // const firstAccount = bankAccounts?.[0];
  return (
    <CompanyBankDetails
      onSubmit={async ({ accountNumber, accountName, sortCode, joinedAt }) => {
        await updateBankDetails({
          variables: {
            input: {
              uuid: companyUuid,
              accountName,
              accountNumber,
              sortCode,
              joinedAt,
            },
          },
        });
      }}
    />
  );
};

export default CompanyBankDetailsFormContainer;
