import { Context } from '@aws-appsync/utils';
import { remove } from '@aws-appsync/utils/dynamodb';
import { MutationDeleteProjectArgs } from '../types/schema';
import { DBProject } from '../types/db';

export const request = (ctx: Context<MutationDeleteProjectArgs>) => {
  return remove<DBProject>({
    key: {
      id: ctx.arguments.id,
    },
  });
};

export const response = (ctx: Context) => {
  if (!ctx.result) {
    util.error('Task not found', 'NotFound');
  } else if (ctx.error) {
    util.error('Internal Error', 'InternalError');
  }

  return ctx.result;
};
