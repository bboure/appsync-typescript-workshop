import { Context, util } from '@aws-appsync/utils';
import { put } from '@aws-appsync/utils/dynamodb';
import { MutationCreateProjectArgs } from '../types/schema';
import { DBProject } from '../types/db';

export const request = (ctx: Context<MutationCreateProjectArgs>) => {
  return put<DBProject>({
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
