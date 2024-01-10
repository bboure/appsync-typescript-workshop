import { AppSyncIdentityCognito, Identity } from '@aws-appsync/utils';

export const isCognitoIdentity = (
  identity: Identity,
): identity is AppSyncIdentityCognito => {
  // @ts-ignore
  return identity?.username !== undefined;
};
