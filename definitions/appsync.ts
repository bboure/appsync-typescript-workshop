import { AppSyncConfig } from 'serverless-appsync-plugin';

export const appSync: AppSyncConfig = {
  // 1.1. Define the AppSync API
  name: 'AppSync Workshop',
  schema: 'schema/schema.graphql',
  logging: {
    level: 'ALL',
  },
  authentication: {
    type: 'AMAZON_COGNITO_USER_POOLS',
    config: {
      userPoolId: {
        Ref: 'CognitoUserPool',
      },
    },
  },
  dataSources: {
    none: {
      type: 'NONE',
    },
    tasks: {
      type: 'AMAZON_DYNAMODB',
      config: {
        tableName: { Ref: 'Tasks' },
      },
    },
    projects: {
      type: 'AMAZON_DYNAMODB',
      config: {
        tableName: { Ref: 'Projects' },
      },
    },
    projectUsers: {
      type: 'AMAZON_DYNAMODB',
      config: {
        tableName: { Ref: 'ProjectUsers' },
      },
    },
  },
  pipelineFunctions: {
    authorizeUser: {
      dataSource: 'projectUsers',
      code: 'src/resolvers/authorizeUser.ts',
    },
  },
  resolvers: {
    // Tasks
    'Query.getTask': {
      kind: 'PIPELINE',
      functions: [
        {
          dataSource: 'tasks',
          code: 'src/resolvers/Query.getTask.ts',
        },
        'authorizeUser',
      ],
    },
    'Query.listTasks': {
      kind: 'PIPELINE',
      code: 'src/resolvers/Query.listTasks.ts',
      functions: [
        'authorizeUser',
        {
          dataSource: 'tasks',
          code: 'src/resolvers/listTasks.ts',
        },
      ],
    },
    'Mutation.createTask': {
      dataSource: 'tasks',
      kind: 'UNIT',
      code: 'src/resolvers/Mutation.createTask.ts',
    },
    'Mutation.updateTask': {
      dataSource: 'tasks',
      kind: 'UNIT',
      code: 'src/resolvers/Mutation.updateTask.ts',
    },
    'Mutation.deleteTask': {
      dataSource: 'tasks',
      kind: 'UNIT',
      code: 'src/resolvers/Mutation.deleteTask.ts',
    },
    'Task.project': {
      dataSource: 'projects',
      kind: 'UNIT',
      code: 'src/resolvers/Task.project.ts',
    },
    // Projects
    'Query.getProject': {
      dataSource: 'projects',
      kind: 'UNIT',
      code: 'src/resolvers/Query.getProject.ts',
    },
    'Mutation.createProject': {
      dataSource: 'projects',
      kind: 'UNIT',
      code: 'src/resolvers/Mutation.createProject.ts',
    },
    'Mutation.updateProject': {
      dataSource: 'projects',
      kind: 'UNIT',
      code: 'src/resolvers/Mutation.updateProject.ts',
    },
    'Mutation.deleteProject': {
      dataSource: 'projects',
      kind: 'UNIT',
      code: 'src/resolvers/Mutation.deleteProject.ts',
    },
    'Mutation.addUserToProject': {
      dataSource: 'projectUsers',
      kind: 'UNIT',
      code: 'src/resolvers/Mutation.addUserToProject.ts',
    },
    'Subscription.onTaskAssigned': {
      dataSource: 'none',
      kind: 'UNIT',
      code: 'src/resolvers/Subscription.onTaskAssigned.ts',
    },
  },
};
