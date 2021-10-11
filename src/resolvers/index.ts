import storedPerson from './query/storedPerson';
import storedPersonUuid from './query/storedPersonUuid';
import storedPersonEmail from './query/storedPersonEmail';
import getOrder from './query/getOrder';

import savePerson from './mutation/savePerson';
import savePersonUuid from './mutation/savePersonUuid';
import savePersonEmail from './mutation/savePersonEmail';
import saveOrder from './mutation/saveOrder';

export default {
  Query: {
    storedPerson,
    storedPersonUuid,
    getOrder,
    storedPersonEmail,
  },
  Mutation: {
    savePerson,
    savePersonUuid,
    saveOrder,
    savePersonEmail,
  },
};
