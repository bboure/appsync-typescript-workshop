import { AWS } from '@serverless/typescript';

export const dynamodb: NonNullable<AWS['resources']>['Resources'] = {
  // 2.1. Define the DynamoDB tables
  Tasks: {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
      TableName: '${self:service}-${sls:stage}-tasks',
      BillingMode: 'PAY_PER_REQUEST',
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S',
        },
        {
          AttributeName: 'projectId',
          AttributeType: 'S',
        },
        {
          AttributeName: 'createdAt',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'id',
          KeyType: 'HASH',
        },
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: 'byProject',
          KeySchema: [
            {
              AttributeName: 'projectId',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'createdAt',
              KeyType: 'RANGE',
            },
          ],
          Projection: {
            ProjectionType: 'ALL',
          },
        },
      ],
    },
  },
  Projects: {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
      TableName: '${self:service}-${sls:stage}-projects',
      BillingMode: 'PAY_PER_REQUEST',
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'id',
          KeyType: 'HASH',
        },
      ],
    },
  },
  ProjectUsers: {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
      TableName: '${self:service}-${sls:stage}-project-users',
      BillingMode: 'PAY_PER_REQUEST',
      AttributeDefinitions: [
        {
          AttributeName: 'projectId',
          AttributeType: 'S',
        },
        {
          AttributeName: 'username',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'projectId',
          KeyType: 'HASH',
        },
        {
          AttributeName: 'username',
          KeyType: 'RANGE',
        },
      ],
    },
  },
};
