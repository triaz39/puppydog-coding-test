import { createServer } from 'http';
import { CONFIG } from './config/env';
import { createApp } from './app';

const server = createServer(createApp());

server.listen(CONFIG.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `🚀 Server listening on http://localhost:${CONFIG.PORT} (MODE=${CONFIG.MODE})`,
  );
});

const shutdown = (signal: NodeJS.Signals) => {
  // eslint-disable-next-line no-console
  console.log(`${signal} received — closing server...`);
  server.close((err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error('Error while closing server:', err);
      process.exit(1);
    }
    process.exit(0);
  });
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

export default server;
