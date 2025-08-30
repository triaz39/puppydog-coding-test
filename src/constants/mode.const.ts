export enum MODES {
  CALLBACKS = 'callbacks',
  ASYNC = 'async',
  PROMISES = 'promises',
  AWAIT = 'await',
}

export const ALLOWED_MODES: MODES[] = [
  MODES.ASYNC,
  MODES.AWAIT,
  MODES.CALLBACKS,
  MODES.PROMISES,
];
