import { Context, util } from '@aws-appsync/utils';
import { put } from '@aws-appsync/utils/dynamodb';
import { MutationCreateTaskArgs } from '../types/schema';
import { DBTask } from '../types/db';

export const request = (ctx: Context<MutationCreateTaskArgs>) => {
  return put<DBTask>({
    key: {
      id: util.autoId(),
    },
    item: {
      ...ctx.arguments.input,
      updatedAt: util.time.nowISO8601(),
      createdAt: util.time.nowISO8601(),
    },
    condition: {
      id: { attributeExists: false },
    },
  });
};

export const response = (ctx: Context) => {
  return ctx.result;
};
