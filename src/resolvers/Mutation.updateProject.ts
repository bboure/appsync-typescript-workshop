import { Context, util } from '@aws-appsync/utils';
import { update } from '@aws-appsync/utils/dynamodb';
import { MutationUpdateProjectArgs } from '../types/schema';

export const request = (ctx: Context<MutationUpdateProjectArgs>) => {
  const { id, ...updateAttrs } = ctx.arguments.input;

  return update({
    key: {
      id: id,
    },
    update: {
      ...updateAttrs,
      updatedAt: util.time.nowISO8601(),
    },
    condition: {
      id: { attributeExists: true },
    },
  });
};

export const response = (ctx: Context) => {
  if (ctx.error) {
    if (ctx.error.type === 'DynamoDB:ConditionalCheckFailedException') {
      util.error('Project not found', 'NotFound');
    } else {
      util.error('Internal Error', 'InternalError');
    }
  }

  return ctx.result;
};
