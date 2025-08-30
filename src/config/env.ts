import dotenv from 'dotenv';
import { MODES, ALLOWED_MODES } from '../constants';
import { isMode } from '../utils';
import { AppEnv } from '../models';

const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path: envFile });

const env: AppEnv = process.env;

// Validate MODE (default to await)
const rawMode = (env.MODE ?? MODES.AWAIT).trim();
if (!isMode(rawMode)) {
  // eslint-disable-next-line no-console
  console.error(
    `Invalid MODE="${rawMode}". Use one of: ${ALLOWED_MODES.join(' | ')}.\n` +
      `Tip: set MODE in .env or via scripts (e.g., cross-env MODE=callbacks).`,
  );
  process.exit(1);
}

export const MODE: MODES = rawMode;

// Validate/normalize PORT
const parsedPort = Number(env.PORT ?? 3000);
export const PORT =
  Number.isFinite(parsedPort) && parsedPort > 0 ? parsedPort : 3000;

export const NODE_ENV = env.NODE_ENV ?? 'development';

export const CONFIG = Object.freeze({ MODE, PORT, NODE_ENV });
