export type NodeEnvironment = 'development' | 'test' | 'production';

export interface AppEnv extends NodeJS.ProcessEnv {
  MODE?: string;
  PORT?: string;
  NODE_ENV?: NodeEnvironment;
}
