import { AWS } from '@serverless/typescript';

export const cognito: NonNullable<AWS['resources']>['Resources'] = {
  // 1.2. Define the Cognito User Pool
  CognitoUserPool: {
    Type: 'AWS::Cognito::UserPool',
    Properties: {
      UserPoolName: 'AWS AppSync Workshop User Pool',
      AutoVerifiedAttributes: ['email'],
    },
  },
  CognitoUserPoolClient: {
    Type: 'AWS::Cognito::UserPoolClient',
    Properties: {
      ClientName: 'AWS AppSync Workshop Client',
      UserPoolId: {
        Ref: 'CognitoUserPool',
      },
      ExplicitAuthFlows: [
        'ALLOW_USER_PASSWORD_AUTH',
        'ALLOW_USER_SRP_AUTH',
        'ALLOW_REFRESH_TOKEN_AUTH',
      ],
    },
  },
};
