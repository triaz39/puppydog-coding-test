export enum MODES {
  CALLBACKS = 'callbacks',
  ASYNC = 'async',
  PROMISES = 'promises',
  ASYNC_AWAIT = 'async-await',
}

export const ALLOWED_MODES: MODES[] = [
  MODES.ASYNC,
  MODES.ASYNC_AWAIT,
  MODES.CALLBACKS,
  MODES.PROMISES,
];
