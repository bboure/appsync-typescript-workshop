import { Context, util } from '@aws-appsync/utils';
import { get } from '@aws-appsync/utils/dynamodb';
import { DBProject, DBTask } from '../types/db';

export const request = (ctx: Context<unknown, {}, undefined, DBTask>) => {
  return get<DBProject>({
    key: {
      id: ctx.source?.projectId,
    },
  });
};

export const response = (ctx: Context) => {
  if (!ctx.result) {
    util.error('Project not found', 'NotFound');
  }

  return ctx.result;
};
