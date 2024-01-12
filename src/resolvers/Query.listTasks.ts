import { Context } from '@aws-appsync/utils';
import { QueryListTasksArgs } from '../types/schema';

export const request = (ctx: Context<QueryListTasksArgs>) => {
  return {
    projectId: ctx.args.projectId,
  };
};

export const response = (ctx: Context) => {
  return ctx.result;
};
