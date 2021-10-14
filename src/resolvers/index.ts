import storedPerson from './query/storedPerson';
import storedPersonUuid from './query/storedPersonUuid';
import storedPersonEmail from './query/storedPersonEmail';
import storedOrder from './query/storedOrder';

import savePerson from './mutation/savePerson';
import savePersonUuid from './mutation/savePersonUuid';
import savePersonEmail from './mutation/savePersonEmail';
import saveOrder from './mutation/saveOrder';
import deletePersonEmail from './mutation/deletePersonEmail';

export default {
  Query: {
    storedPerson,
    storedPersonUuid,
    storedOrder,
    storedPersonEmail,
  },
  Mutation: {
    savePerson,
    savePersonUuid,
    saveOrder,
    savePersonEmail,
    deletePersonEmail,
  },
};
