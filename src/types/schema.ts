export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  AWSDate: { input: string; output: string; }
  AWSDateTime: { input: string; output: string; }
  AWSEmail: { input: string; output: string; }
  AWSIPAddress: { input: string; output: string; }
  AWSJSON: { input: string; output: string; }
  AWSPhone: { input: string; output: string; }
  AWSTime: { input: string; output: string; }
  AWSTimestamp: { input: number; output: number; }
  AWSURL: { input: string; output: string; }
};

export type AddUserToProjectInput = {
  projectId: Scalars['ID']['input'];
  username: Scalars['ID']['input'];
};

export type CreateProjectInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateTaskInput = {
  assignees: Array<Scalars['ID']['input']>;
  description: Scalars['String']['input'];
  priority: Scalars['Int']['input'];
  projectId: Scalars['ID']['input'];
  status: Status;
  title: Scalars['String']['input'];
};

export type DeleteTaskInput = {
  id: Scalars['ID']['input'];
};

export type IProject = {
  createdAt: Scalars['AWSDateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type IProjectUser = {
  createdAt: Scalars['AWSDateTime']['output'];
};

export type ITask = {
  assignees: Array<Scalars['ID']['output']>;
  createdAt: Scalars['AWSDateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  priority: Scalars['Int']['output'];
  status: Status;
  title: Scalars['String']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addUserToProject: ProjectUser;
  createProject: Project;
  createTask: Task;
  deleteProject: Project;
  deleteTask: Task;
  updateProject: Project;
  updateTask: Task;
};


export type MutationAddUserToProjectArgs = {
  input: AddUserToProjectInput;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};


export type MutationDeleteProjectArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTaskArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput;
};


export type MutationUpdateTaskArgs = {
  input: UpdateTaskInput;
};

export type Pagination = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<SortDirection>;
};

export type Project = IProject & {
  __typename?: 'Project';
  createdAt: Scalars['AWSDateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type ProjectUser = IProjectUser & {
  __typename?: 'ProjectUser';
  createdAt: Scalars['AWSDateTime']['output'];
  username: Scalars['ID']['output'];
};

export type Query = {
  __typename?: 'Query';
  getProject: Project;
  getTask: Task;
  listTasks: TasksResult;
};


export type QueryGetProjectArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetTaskArgs = {
  id: Scalars['ID']['input'];
};


export type QueryListTasksArgs = {
  pagination?: InputMaybe<Pagination>;
  projectId: Scalars['ID']['input'];
};

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum Status {
  Doing = 'DOING',
  Done = 'DONE',
  Todo = 'TODO'
}

export type Subscription = {
  __typename?: 'Subscription';
  onTaskAssigned?: Maybe<Task>;
  onUpdateTask?: Maybe<Task>;
};


export type SubscriptionOnTaskAssignedArgs = {
  minPriority?: InputMaybe<Scalars['Int']['input']>;
};


export type SubscriptionOnUpdateTaskArgs = {
  id: Scalars['ID']['input'];
};

export type Task = ITask & {
  __typename?: 'Task';
  assignees: Array<Scalars['ID']['output']>;
  createdAt: Scalars['AWSDateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  priority: Scalars['Int']['output'];
  project: Project;
  status: Status;
  title: Scalars['String']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type TasksResult = {
  __typename?: 'TasksResult';
  items: Array<Task>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type UpdateProjectInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTaskInput = {
  assignees?: InputMaybe<Array<Scalars['ID']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  priority?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Status>;
  title?: InputMaybe<Scalars['String']['input']>;
};
