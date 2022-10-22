export const BASE_ROUTE = '/fashionlog/api/v1/';

export const SERVER = {
  DEV_SERVER: process.env.DEV_SERVER || 'https://dev.fashionlog.me',
  STAGE_SERVER: process.env.STAGE_SERVER || 'https://stage.fashionlog.me',
  PROD_SERVER: process.env.PROD_SERVER || 'https://stage.fashionlog.me',
  LOCAL: process.env.APP_URL || 'http://localhost:9001',
};
