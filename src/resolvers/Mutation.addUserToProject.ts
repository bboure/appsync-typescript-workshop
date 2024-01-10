import { Context, util } from '@aws-appsync/utils';
import { put } from '@aws-appsync/utils/dynamodb';
import { MutationAddUserToProjectArgs } from '../types/schema';
import { DBProjectUser } from '../types/db';

export const request = (ctx: Context<MutationAddUserToProjectArgs>) => {
  return put<DBProjectUser>({
    key: {
      projectId: ctx.arguments.input.projectId,
      username: ctx.arguments.input.username,
    },
    item: {
      createdAt: util.time.nowISO8601(),
    },
    condition: {
      username: { attributeExists: false },
    },
  });
};

export const response = (ctx: Context) => {
  if (ctx.error) {
    if (ctx.error.type === 'DynamoDB:ConditionalCheckFailedException') {
      util.error('User already added to project', 'AlreadyExists');
    }
  }

  return ctx.result;
};
