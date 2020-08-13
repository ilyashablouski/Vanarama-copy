// eslint-disable-next-line import/no-extraneous-dependencies
import { MockedResponse } from '@apollo/client/testing';
import {
  GetPersonSummaryQuery,
  GetPersonSummaryQueryVariables,
} from '../../../../generated/GetPersonSummaryQuery';
import { GET_PERSON_SUMMARY } from '../SummaryFormContainer';
import { fullCreditChecker, fullCreditCheckerVariables } from '../../../../generated/fullCreditChecker';
import { VehicleTypeEnum } from '../../../../generated/globalTypes';
import { FULL_CREDIT_CHECKER_MUTATION } from '../../../components/SummaryForm/Utils';


 
];

export default (uuid: string) =>
  ({
    request: {
      query: FULL_CREDIT_CHECKER_MUTATION,
      variables: {
        partyId: '-1',
        creditApplicationUuid: '-1',
        orderUuid: '-1',
        vehicleType: VehicleTypeEnum.CAR,
        monthlyPayment: -1,
        depositPayment: -1,
      } as fullCreditCheckerVariables,
    },
    result: {
        data: {
          fullCreditChecker: {
            uuid: -1,
            creditCheckType: -1,
            creditCheckLines: {
              uuid: -1,
              funder: -1,
              likelihood: -1,
            }
          },
          party: {
            uuid: -1,
            person: {
              uuid: -1,
              partyId: -1,
              partyUuid: -1,
              firstName: -1,
              lastName: -1
            }
        },
    } as fullCreditChecker,
    },
  } as MockedResponse);
