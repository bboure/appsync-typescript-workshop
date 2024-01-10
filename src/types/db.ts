import { IProject, IProjectUser, ITask } from './schema';

export type DBTask = ITask & {
  projectId: string;
};

export type DBProject = IProject;

export type DBProjectUser = IProjectUser & {
  username: string;
  projectId: string;
};
