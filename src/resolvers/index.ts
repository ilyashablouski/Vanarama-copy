import storedPerson from './query/storedPerson';
import storedPersonUuid from './query/storedPersonUuid';
import storedPersonEmail from './query/storedPersonEmail';

import savePerson from './mutation/savePerson';
import savePersonUuid from './mutation/savePersonUuid';
import savePersonEmail from './mutation/savePersonEmail';

export default {
  Query: {
    storedPerson,
    storedPersonUuid,
    storedPersonEmail,
  },
  Mutation: {
    savePerson,
    savePersonUuid,
    savePersonEmail,
  },
};
