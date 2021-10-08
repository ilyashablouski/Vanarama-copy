import storedPerson from './query/storedPerson';
import storedPersonUuid from './query/storedPersonUuid';
import getOrder from './query/getOrder';

import savePerson from './mutation/savePerson';
import savePersonUuid from './mutation/savePersonUuid';
import saveOrder from './mutation/saveOrder';

export default {
  Query: {
    storedPerson,
    storedPersonUuid,
    getOrder,
  },
  Mutation: {
    savePerson,
    savePersonUuid,
    saveOrder,
  },
};
