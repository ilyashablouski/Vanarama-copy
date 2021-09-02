import storedPerson from './query/storedPerson';

import savePerson from './mutation/savePerson';

export default {
  Query: {
    storedPerson,
  },
  Mutation: {
    savePerson,
  },
};
