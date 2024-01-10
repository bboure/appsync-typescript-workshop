import { Context, util } from '@aws-appsync/utils';
import { get } from '@aws-appsync/utils/dynamodb';
import { QueryGetTaskArgs } from '../types/schema';
import { DBTask } from '../types/db';

export const request = (ctx: Context<QueryGetTaskArgs>) => {
  return get<DBTask>({
    key: {
      id: ctx.args.id,
    },
  });
};

export const response = (ctx: Context<QueryGetTaskArgs>) => {
  if (!ctx.result) {
    util.error('Task not found', 'NotFound');
  }

  return ctx.result;
};
