import * as process from 'process';

export const appConfig = {
  env: process.env.NODE_ENV,
  port: parseInt(process.env.API_PORT || '3000', 10),
};
