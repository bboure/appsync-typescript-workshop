import { AWS } from '@serverless/typescript';
import { AppSyncConfig } from 'serverless-appsync-plugin';
import { appSync } from './definitions/appsync';
import { dynamodb } from './definitions/dynamodb';
import { cognito } from './definitions/cognito';

type SlsConfig = AWS & {
  appSync: AppSyncConfig;
};

const service: SlsConfig = {
  service: 'appsync-typescript-workshop',
  frameworkVersion: '3',
  configValidationMode: 'error',
  plugins: ['serverless-appsync-plugin', 'serverless-iam-roles-per-function'],
  provider: {
    name: 'aws',
    region: 'us-east-1',
    runtime: 'nodejs20.x',
  },
  appSync: appSync,
  resources: {
    Resources: {
      ...dynamodb,
      ...cognito,
    },
  },
};

module.exports = service;
