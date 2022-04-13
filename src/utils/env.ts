export enum Env {
  DEV = 'dev',
  UAT = 'uat',
  PRE_PROD = 'pre-prod',
  PROD = 'prod',
}

export default Env;

const DEFAULT_REVALIDATE_INTERVAL_VALUE = 43200;
const DEFAULT_REVALIDATE_INTERVAL_ERROR_VALUE = 60;

export const DEFAULT_REVALIDATE_INTERVAL =
  Number(process.env.REVALIDATE_INTERVAL) || DEFAULT_REVALIDATE_INTERVAL_VALUE;

export const DEFAULT_REVALIDATE_INTERVAL_ERROR =
  Number(process.env.REVALIDATE_INTERVAL_ERROR) ||
  DEFAULT_REVALIDATE_INTERVAL_ERROR_VALUE;

export const isTesting = process.env.NODE_ENV === 'test';
