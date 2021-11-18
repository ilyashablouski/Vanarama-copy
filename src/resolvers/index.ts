import storedPerson from './query/storedPerson';
import storedPersonUuid from './query/storedPersonUuid';
import storedPersonEmail from './query/storedPersonEmail';
import storedOrder from './query/storedOrder';
import storedPersonBankUuid from './query/storedPersonBankUuid';
import storedQuote from './query/storedQuote';
import storedWishlistVehicleIds from './query/storedWishlistVehicleIds';
import storedItemsToCompare from './query/storedItemsToCompare';

import savePerson from './mutation/savePerson';
import savePersonUuid from './mutation/savePersonUuid';
import savePersonEmail from './mutation/savePersonEmail';
import saveOrder from './mutation/saveOrder';
import saveQuote from './mutation/saveQuote';
import deletePersonEmail from './mutation/deletePersonEmail';
import savePersonBankUuid from './mutation/savePersonBankUuid';
import deleteStoredPerson from './mutation/deleteStoredPerson';
import saveWishlistVehicleIds from './mutation/saveWishlistVehicleIds';
import saveItemsToCompare from './mutation/saveItemsToCompare';

export default {
  Query: {
    storedPerson,
    storedPersonUuid,
    storedOrder,
    storedPersonEmail,
    storedPersonBankUuid,
    storedQuote,
    storedWishlistVehicleIds,
    storedItemsToCompare,
  },
  Mutation: {
    savePerson,
    savePersonUuid,
    saveOrder,
    savePersonEmail,
    saveQuote,
    deletePersonEmail,
    savePersonBankUuid,
    deleteStoredPerson,
    saveWishlistVehicleIds,
    saveItemsToCompare,
  },
};
