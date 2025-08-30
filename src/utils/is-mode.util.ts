import { MODES, ALLOWED_MODES } from '../constants';

export const isMode = (value: string): value is MODES =>
  (ALLOWED_MODES as string[]).includes(value);
