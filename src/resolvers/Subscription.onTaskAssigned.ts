import {
  Context,
  SubscriptionFilterObject,
  extensions,
} from '@aws-appsync/utils';
import { SubscriptionOnTaskAssignedArgs, Task } from '../types/schema';
import { isCognitoIdentity } from '../utils';

export const request = (ctx: Context<SubscriptionOnTaskAssignedArgs>) => {
  return {};
};

export const response = (ctx: Context<SubscriptionOnTaskAssignedArgs>) => {
  if (!isCognitoIdentity(ctx.identity)) {
    util.unauthorized();
  }

  const filter: SubscriptionFilterObject<Task> = {
    assignees: {
      contains: ctx.identity.username,
    },
  };

  if (ctx.args.minPriority) {
    filter.priority = {
      ge: ctx.args.minPriority,
    };
  }

  extensions.setSubscriptionFilter(util.transform.toSubscriptionFilter(filter));

  return ctx.result;
};
