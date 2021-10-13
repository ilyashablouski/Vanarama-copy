import storedPerson from './query/storedPerson';
import storedPersonUuid from './query/storedPersonUuid';
import storedPersonEmail from './query/storedPersonEmail';
import storedOrder from './query/storedOrder';
import storedQuote from './query/storedQuote';

import savePerson from './mutation/savePerson';
import savePersonUuid from './mutation/savePersonUuid';
import savePersonEmail from './mutation/savePersonEmail';
import saveOrder from './mutation/saveOrder';
import saveQuote from './mutation/saveQuote';

export default {
  Query: {
    storedPerson,
    storedPersonUuid,
    storedOrder,
    storedPersonEmail,
    storedQuote,
  },
  Mutation: {
    savePerson,
    savePersonUuid,
    saveOrder,
    savePersonEmail,
    saveQuote,
  },
};
