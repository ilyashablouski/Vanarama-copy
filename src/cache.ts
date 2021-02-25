import { makeVar } from '@apollo/client';

export const isSessionFinishedCache = makeVar(false);

export default isSessionFinishedCache;
