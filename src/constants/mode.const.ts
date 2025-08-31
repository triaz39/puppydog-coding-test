export enum MODES {
  CALLBACKS = 'callbacks',
  ASYNC = 'async',
  PROMISES = 'promises',
  ASYNC_AWAIT = 'async-await',
  STREAM = 'stream',
}

export const ALLOWED_MODES: MODES[] = Object.values(MODES);
