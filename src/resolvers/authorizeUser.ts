import { Context, util, runtime } from '@aws-appsync/utils';
import { get } from '@aws-appsync/utils/dynamodb';
import { DBProjectUser } from '../types/db';
import { isCognitoIdentity } from '../utils';

export const request = (ctx: Context) => {
  if (!isCognitoIdentity(ctx.identity)) {
    util.unauthorized();
  }

  if (ctx.identity.groups?.includes('Admins')) {
    runtime.earlyReturn(ctx.prev.result);
  }

  return get<DBProjectUser>({
    key: {
      projectId: ctx.prev.result.projectId,
      username: ctx.identity.username,
    },
  });
};

export const response = (ctx: Context) => {
  if (!ctx.result) {
    util.unauthorized();
  }

  return ctx.prev.result;
};
