export const BASE_ROUTE = 'pricing/api/v1/';

export const SERVER = {
  DEV_SERVER: process.env.DEV_SERVER || 'https://dev.retailo.me',
  STAGE_SERVER: process.env.STAGE_SERVER || 'https://stage.retailo.me',
  PROD_SERVER: process.env.PROD_SERVER || 'https://stage.retailo.me',
  LOCAL: process.env.APP_URL || 'http://localhost:9001',
};
