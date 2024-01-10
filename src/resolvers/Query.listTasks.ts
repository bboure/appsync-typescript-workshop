import { Context } from '@aws-appsync/utils';
import { query } from '@aws-appsync/utils/dynamodb';
import { QueryListTasksArgs, SortDirection } from '../types/schema';
import { DBTask } from '../types/db';

export const request = (ctx: Context<QueryListTasksArgs>) => {
  const {
    limit = 10,
    nextToken,
    sortDirection = SortDirection.Asc,
  } = ctx.args.pagination || {};

  return query<DBTask>({
    index: 'byProject',
    query: {
      projectId: { eq: ctx.args.projectId },
    },
    limit,
    nextToken,
    scanIndexForward: sortDirection === SortDirection.Asc,
  });
};

export const response = (ctx: Context) => {
  return ctx.result;
};
