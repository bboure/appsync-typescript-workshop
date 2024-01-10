import { Context, util } from '@aws-appsync/utils';
import { get } from '@aws-appsync/utils/dynamodb';
import { QueryGetProjectArgs } from '../types/schema';
import { DBProject } from '../types/db';

export const request = (ctx: Context<QueryGetProjectArgs>) => {
  return get<DBProject>({
    key: {
      id: ctx.args.id,
    },
  });
};

export const response = (ctx: Context) => {
  if (!ctx.result) {
    util.error('Project not found', 'NotFound');
  }

  return ctx.result;
};
